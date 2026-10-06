import hockeyImage from '../assets/images/works/hockeybi.webp';
import thesisImage from '../assets/images/works/thesis_graph.webp';
import beersImage from '../assets/images/works/world_beer_visu.webp';
import githubIcon from '../assets/icons/github.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import mailIcon from '../assets/icons/mail.svg';
import UserRound from '@lucide/svelte/icons/user-round';
import FolderCode from '@lucide/svelte/icons/folder-code';
import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
import GraduationCap from '@lucide/svelte/icons/graduation-cap';
import FolderTree from '@lucide/svelte/icons/folder-tree';

export const sections = {
  about: { id: 'about', command: 'fastfetch', title: 'About', icon: UserRound },
  projects: {
    id: 'projects',
    command: 'ls ./projects',
    title: 'Projects',
    icon: FolderCode,
  },
  experience: {
    id: 'experience',
    command: 'git log',
    title: 'Experience',
    icon: BriefcaseBusiness,
  },
  education: {
    id: 'education',
    command: 'cat education.json',
    title: 'Education',
    icon: GraduationCap,
  },
  skills: {
    id: 'skills',
    command: 'tree ./skills',
    title: 'Skills',
    icon: FolderTree,
  },
} as const;

export interface Skill {
  id: string;
  name: string;
  description: string;
  related: { label: string; href: string }[];
}

export interface SkillGroup {
  id: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'data-science',
    skills: [
      {
        id: 'machine-learning',
        name: 'Machine learning',
        description:
          'Working with random forests and LSTMs to predict incorrect contribution payments.',
        related: [{ label: 'Forecasting thesis', href: '#projects' }],
      },
      {
        id: 'forecasting',
        name: 'Forecasting',
        description:
          'Predicting incorrect contribution payments to help prevent accumulating interest.',
        related: [{ label: 'Forecasting thesis', href: '#projects' }],
      },
      {
        id: 'data-visualization',
        name: 'Data visualization',
        description:
          'Making data easier to explore through interactive visualizations.',
        related: [{ label: 'World Beers visualization', href: '#projects' }],
      },
    ],
  },
  {
    id: 'data-engineering',
    skills: [
      {
        id: 'data-pipelines',
        name: 'Data pipelines',
        description:
          'Building end-to-end migration pipelines with product owners and clients.',
        related: [{ label: 'Data engineering at ELCA', href: '#experience' }],
      },
      {
        id: 'data-migration',
        name: 'Data migration',
        description:
          'Moving data between systems in close collaboration with the people who use it.',
        related: [{ label: 'Data engineering at ELCA', href: '#experience' }],
      },
      {
        id: 'automation',
        name: 'Automation',
        description:
          'Automating lineups and supporting transfer decisions in Hockey Manager.',
        related: [{ label: 'Hockey analytics', href: '#projects' }],
      },
    ],
  },
  {
    id: 'software',
    skills: [
      {
        id: 'typescript',
        name: 'TypeScript',
        description:
          'Using typed components and shared navigation logic in this portfolio.',
        related: [{ label: 'This portfolio', href: '#about' }],
      },
      {
        id: 'svelte',
        name: 'Svelte',
        description:
          'Building this portfolio with Svelte 5, reusable components, and responsive layouts.',
        related: [{ label: 'This portfolio', href: '#about' }],
      },
      {
        id: 'git',
        name: 'Git',
        description:
          'Versioning this portfolio and sharing project source code on GitHub.',
        related: [
          {
            label: 'Portfolio source',
            href: 'https://github.com/loiclovitana/loic-portofolio',
          },
        ],
      },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: { href: string; label: string; ariaLabel: string };
  note?: string;
}

export const projects: Project[] = [
  {
    id: 'HOCKEY_BI',
    title: 'An edge on the ice',
    category: 'AUTOMATION · ANALYTICS',
    description:
      'Smarter transfers, automatic lineups, and injury detection for Hockey Manager.',
    image: hockeyImage,
    imageAlt: 'Hockey Manager dashboard showing player performance',
    link: {
      href: 'https://github.com/loiclovitana/Hockey_BI',
      label: 'View source',
      ariaLabel: 'View Hockey Manager Analysis on GitHub',
    },
  },
  {
    id: 'MASTER_THESIS',
    title: 'Forecasting what’s next',
    category: 'MACHINE LEARNING · RESEARCH',
    description:
      'Random forests and LSTMs to predict incorrect contribution payments and prevent accumulating interest.',
    image: thesisImage,
    imageAlt: 'Forecasting results from my master thesis',
    note: 'MSc thesis · EPFL / ELCA',
  },
  {
    id: 'WORLD_BEERS',
    title: 'A world worth brewing',
    category: 'DATA VISUALIZATION · EXPLORATION',
    description:
      'An interactive trip through the world’s beers, built with data from BeerAdvocate.',
    image: beersImage,
    imageAlt: 'Interactive world map of beers from BeerAdvocate',
    link: {
      href: 'https://com-480-data-visualization.github.io/com-480-project-datasat/src/',
      label: 'Explore the visualization',
      ariaLabel: 'Explore World Beers Visualization',
    },
  },
];

export const experience = [
  {
    date: '06.2025 — 08.2025',
    title: 'Software Engineer',
    company: 'Anaxa Sàrl',
    href: 'https://anaxa.ch',
    location: 'Geneva, Switzerland',
    latest: true,
  },
  {
    date: '03.2021 — 05.2025',
    title: 'Data Engineer',
    company: 'ELCA Informatique',
    location: 'Lausanne, Switzerland',
    description:
      'End-to-end data migration pipelines, built in close collaboration with product owners and clients.',
  },
  {
    date: '09.2020 — 02.2021',
    title: 'Data Science Intern',
    company: 'ELCA Informatique',
    location: 'Lausanne, Switzerland',
  },
];

export const education = [
  {
    date: '2015 — 2021',
    school: 'EPFL',
    name: 'École Polytechnique Fédérale de Lausanne',
    degree: 'MSc & BSc in Computer Science',
    href: 'https://www.epfl.ch/about/',
  },
  {
    date: '2017 — 2018',
    school: 'NUS',
    name: 'National University of Singapore',
    degree: 'Exchange · Non-graduating program',
    href: 'https://nus.edu.sg/',
  },
];

export const contactEmail = 'loic@vandenberghe.ch';

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/loiclovitana',
    icon: githubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/loic-vdb/',
    icon: linkedinIcon,
  },
];

export const contactLinks = [
  {
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: mailIcon,
    external: false,
  },
  ...socialLinks.map((link) => ({
    ...link,
    value: link.href.replace(/^https?:\/\/(www\.)?/, ''),
    external: true,
  })),
];
