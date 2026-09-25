document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Website message from ${data.get("full-name") || data.get("email")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\nReply to: ${data.get("email")}`);
  window.location.href = `mailto:mail@example.com?subject=${subject}&body=${body}`;
});
