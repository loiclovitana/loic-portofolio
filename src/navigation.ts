/** One visible section, with native scrolling inside it and optional entry selection. */
export function sectionNavigation(
  main: HTMLElement,
  options: { onselect: (id: string) => void },
) {
  const panels = Array.from(main.querySelectorAll<HTMLElement>('section[id]'));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const { signal } = listeners;
  let active = 0;
  let selected: HTMLElement | undefined;
  let animation: Animation | undefined;
  let lastSwitch = -Infinity;
  let lastWheel = -Infinity;
  let wheelConsumed = false;
  let wheelDistance = 0;
  let touch:
    { x: number; y: number; top: boolean; bottom: boolean } | undefined;

  function entries() {
    return Array.from(
      panels[active].querySelectorAll<HTMLElement>('[data-nav-item]'),
    );
  }

  function selectEntry(entry?: HTMLElement, focus = false) {
    selected?.removeAttribute('aria-current');
    selected = entry;
    selected?.setAttribute('aria-current', 'true');
    if (focus && selected) {
      selected.focus({ preventScroll: true });
      selected.scrollIntoView({
        block: 'nearest',
        behavior: motion.matches ? 'instant' : 'smooth',
      });
    }
  }

  function show(index: number, updateHash = true, focus = true) {
    if (index < 0 || index >= panels.length) return false;
    const direction = Math.sign(index - active);
    animation?.cancel();
    selectEntry();
    active = index;
    panels.forEach((panel, i) => (panel.hidden = i !== active));
    const panel = panels[active];
    panel.scrollTop = 0;
    options.onselect(panel.id);
    if (updateHash && location.hash !== `#${panel.id}`) {
      window.history.replaceState(window.history.state, '', `#${panel.id}`);
    }
    if (focus) panel.focus({ preventScroll: true });
    if (direction) {
      lastSwitch = performance.now();
      if (!motion.matches) {
        animation = panel.animate(
          [
            { opacity: 0, transform: `translateY(${direction * 24}px)` },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 280, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
        );
      }
    }
    return true;
  }

  function fromHash(focus = true) {
    const index = panels.findIndex((panel) => `#${panel.id}` === location.hash);
    show(index < 0 ? 0 : index, false, focus);
  }

  function moveEntry(direction: number) {
    const items = entries();
    const index = selected ? items.indexOf(selected) : -1;
    const next = index + direction;
    if (next >= 0 && next < items.length) {
      selectEntry(items[next], true);
    } else if (show(active + direction)) {
      const nextItems = entries();
      selectEntry(direction > 0 ? nextItems[0] : nextItems.at(-1), true);
    }
  }

  function onKey(event: KeyboardEvent) {
    const target = event.target;
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.isComposing ||
      (target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest(
            'input, textarea, select, [role="slider"], [role="combobox"]',
          )))
    )
      return;

    const index = /^[0-9]$/.test(event.key) ? Number(event.key) : -1;
    if (index >= 0 && index < panels.length) {
      event.preventDefault();
      show(index);
    } else if (
      [
        'PageUp',
        'PageDown',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
      ].includes(event.key)
    ) {
      event.preventDefault();
      const direction =
        event.key.endsWith('Down') || event.key === 'ArrowRight' ? 1 : -1;
      if (event.key.startsWith('Page')) show(active + direction);
      else moveEntry(direction);
    }
  }

  function onClick(event: MouseEvent) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link =
      event.target instanceof Element ? event.target.closest('a') : null;
    if (!link || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (
      url.origin !== location.origin ||
      url.pathname !== location.pathname ||
      url.search !== location.search
    )
      return;
    const index = panels.findIndex((panel) => `#${panel.id}` === url.hash);
    if (index < 0) return;
    event.preventDefault();
    show(index);
  }

  function atEdge(direction: number) {
    const panel = panels[active];
    return direction < 0
      ? panel.scrollTop <= 1
      : panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
  }

  function onWheel(event: WheelEvent) {
    if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY))
      return;
    const now = performance.now();
    if (now - lastWheel > 180) {
      wheelConsumed = false;
      wheelDistance = 0;
    }
    lastWheel = now;
    // Consume the rest of a trackpad gesture after switching, including its inertia.
    if (wheelConsumed || now - lastSwitch < 350) {
      event.preventDefault();
      return;
    }
    const direction = Math.sign(event.deltaY);
    if (!atEdge(direction)) {
      wheelDistance = 0;
      return;
    }
    event.preventDefault();
    const unit =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? main.clientHeight
          : 1;
    if (Math.sign(wheelDistance) !== direction) wheelDistance = 0;
    wheelDistance += event.deltaY * unit;
    if (Math.abs(wheelDistance) >= 40 && show(active + direction)) {
      wheelConsumed = true;
    }
  }

  function syncEntry(event: Event) {
    const entry =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-nav-item]')
        : null;
    if (entry && panels[active].contains(entry)) selectEntry(entry);
  }

  fromHash(false);
  window.addEventListener('keydown', onKey, { signal });
  window.addEventListener('hashchange', () => fromHash(), { signal });
  document.addEventListener('click', onClick, { signal });
  main.addEventListener('wheel', onWheel, { passive: false, signal });
  main.addEventListener('focusin', syncEntry, { signal });
  main.addEventListener('click', syncEntry, { signal });
  main.addEventListener(
    'touchstart',
    (event) => {
      touch =
        event.touches.length === 1
          ? {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
              top: atEdge(-1),
              bottom: atEdge(1),
            }
          : undefined;
    },
    { passive: true, signal },
  );
  main.addEventListener(
    'touchend',
    (event) => {
      if (!touch || !event.changedTouches.length) return;
      const dy = touch.y - event.changedTouches[0].clientY;
      const dx = touch.x - event.changedTouches[0].clientX;
      if (
        Math.abs(dy) > 50 &&
        Math.abs(dy) > Math.abs(dx) &&
        (dy > 0 ? touch.bottom : touch.top)
      ) {
        show(active + Math.sign(dy));
      }
      touch = undefined;
    },
    { passive: true, signal },
  );
  main.addEventListener(
    'touchcancel',
    () => {
      touch = undefined;
    },
    { signal },
  );
  motion.addEventListener('change', () => animation?.cancel(), { signal });

  return {
    destroy() {
      listeners.abort();
      animation?.cancel();
    },
  };
}
