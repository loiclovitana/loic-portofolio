import hockeyImage from '../assets/images/works/hockeybi.webp';
import thesisImage from '../assets/images/works/thesis_graph.webp';
import beersImage from '../assets/images/works/world_beer_visu.webp';

export const sections = {
  about: { id: 'about', command: 'fastfetch' },
  projects: {
    id: 'projects',
    command: 'ls ./projects',
    title: 'Things I’ve built',
  },
  experience: {
    id: 'experience',
    command: 'cat experience.log',
    title: 'The journey so far',
  },
  education: {
    id: 'education',
    command: 'cat education.json',
    title: 'Where it started',
  },
  contact: { id: 'contact', command: './say-hello' },
} as const;

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
    date: '06.2025 — Present',
    title: 'DevOps',
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

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/loiclovitana' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/loic-vdb/' },
];
