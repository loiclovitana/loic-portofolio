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
  skills: {
    id: 'skills',
    command: 'tree ./skills',
    title: 'Skills',
    icon: FolderTree,
  },
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
    title: "Forecasting what's next",
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
      "An interactive trip through the world's beers, built with data from BeerAdvocate.",
    image: beersImage,
    imageAlt: 'Interactive world map of beers from BeerAdvocate',
    link: {
      href: 'https://com-480-data-visualization.github.io/com-480-project-datasat/src/',
      label: 'Explore the visualization',
      ariaLabel: 'Explore World Beers Visualization',
    },
  },
];

export interface Experience {
  id: string;
  date: string;
  title: string;
  company: string;
  href?: string;
  location: string;
  latest?: boolean;
  volunteer?: boolean;
  summary: string;
  projects: { title: string; points: string[] }[];
  technologies: string[];
}

export const experience: Experience[] = [
  {
    id: 'anaxa',
    date: '07.2025 — 08.2026',
    title: 'Software Engineer',
    company: 'Anaxa Sàrl',
    href: 'https://anaxa.ch',
    location: 'Geneva, Switzerland',
    latest: true,
    summary:
      'Built AI-powered applications and real-time analytics tools, from data pipelines and user interfaces to deployment and infrastructure.',
    projects: [
      {
        title: 'AI-powered sports analytics',
        points: [
          'Built Claude and Gemini agents for Premier League player analytics, with tools for automated charts and data visualization.',
          'Developed a Cube.js semantic layer with role-based access control.',
        ],
      },
      {
        title: 'News event tracking',
        points: [
          'Built a FastAPI and RabbitMQ pipeline to ingest news articles, use LLMs to extract structured event and topic information, and store the results in MongoDB.',
          'Developed a React dashboard for journalists to find articles about an event and compare what each article says about it.',
        ],
      },
      {
        title: 'Trading systems',
        points: [
          'Built real-time ClickHouse analytics pipelines and a backtesting engine for crypto trading strategies.',
          'Developed copy-trading services and a desktop application in Go, integrating exchange REST and WebSocket APIs.',
        ],
      },
      {
        title: 'Infrastructure & delivery',
        points: [
          'Provisioned infrastructure and managed access with Ansible.',
          'Deployed services with Docker and NGINX, and automated CI/CD with GitHub Actions.',
        ],
      },
    ],
    technologies: [
      'Go',
      'FastAPI',
      'React',
      'MongoDB',
      'RabbitMQ',
      'ClickHouse',
      'Cube.js',
      'Claude / Gemini',
      'Docker',
      'Ansible',
      'GitHub Actions',
    ],
  },
  {
    id: 'elca-senior',
    date: '01.2023 — 07.2025',
    title: 'Senior Engineer',
    company: 'ELCA Informatique',
    location: 'Lausanne, Switzerland',
    href: 'https://www.elca.ch/',
    summary:
      'Designed data migration pipelines and backend services for Swiss social insurance, working closely with business teams and on-boarding new engineers.',
    projects: [
      {
        title: 'Social insurance data migration',
        points: [
          'Translated AHV/IV insurance requirements into staging data models and SQL procedures for ingestion, transformation and loading.',
          'Deployed and automated SSIS packages, generated KPIs and reports.',
        ],
      },
      {
        title: 'Backend & cloud services',
        points: [
          'Built Spring Boot data synchronization services and integrated an upgrade to the external Sedex API.',
          'Specified synchronization tools and deployed automated data analysis and transformations.',
        ],
      },
      {
        title: 'AI knowledge assistant',
        points: [
          'Created a proof-of-concept API combining OpenAI GPT and document indexing to answer questions about Swiss social insurance.',
        ],
      },
    ],
    technologies: ['SQL Server', 'SSIS', 'Data engineering', 'Spring Boot'],
  },
  {
    id: 'elca-engineer',
    date: '04.2021 — 12.2022',
    title: 'Engineer',
    company: 'ELCA Informatique',
    href: 'https://www.elca.ch/',
    location: 'Lausanne, Switzerland',
    summary:
      'Combined machine learning and data engineering to support social insurance teams',
    projects: [
      {
        title: 'Social insurance chatbot',
        points: [
          'Worked with call centers and business experts to identify user needs, design conversation flows and define AI intents.',
          "Collected, cleaned and classified training data to improve the chatbot's responses.",
        ],
      },
      {
        title: 'Disability insurance predictions',
        points: [
          'Trained and evaluated gradient boosting models to support reassessment of disability insurance files.',
          'Supervised an intern and worked with disability insurance offices on data collection and business requirements.',
        ],
      },
      {
        title: 'Contact data migration',
        points: [
          'Maintained and adapted SQL Server staging models and stored procedures for ingestion, transformation and loading, backed by unit and integration tests.',
          'Participation of architecture change and industrialistation from pure SQL procedure to versionned SSIS and SQL server project.',
        ],
      },
    ],
    technologies: [
      'SQL Server',
      'SSIS',
      'Machine learning',
      'Gradient boosting',
      'Conversational AI',
    ],
  },
  {
    id: 'elca-intern',
    date: '09.2020 — 04.2021',
    title: 'Data Science Intern',
    company: 'ELCA Informatique',
    href: 'https://www.elca.ch/',
    location: 'Lausanne, Switzerland',
    summary:
      "Completed a data science internship at ELCA alongside my EPFL master's thesis, exploring machine learning for social insurance.",
    projects: [
      {
        title: 'Forecasting contribution payments',
        points: [
          'Explored random forests and LSTMs to predict incorrect contribution payments and help prevent accumulating interest.',
        ],
      },
    ],
    technologies: ['Machine learning', 'Random forests', 'LSTM'],
  },
  {
    id: 'esn',
    date: '09.2018 — 08.2020',
    title: 'Webmaster',
    company: 'ESN EPFL',
    location: 'Lausanne, Switzerland',
    href: 'https://epfl.esn.ch/',
    volunteer: true,
    summary:
      'Volunteered with the Erasmus Student Network at EPFL, keeping its website running and helping international students make the most of their exchange.',
    projects: [
      {
        title: 'Website & committee',
        points: [
          "Maintained the association's website and kept its content up to date. Took part in committee decisions.",
        ],
      },
      {
        title: 'Events for 200+ students',
        points: [
          'Helped organize student activities and events, coordinating equipment, rentals and transport.',
        ],
      },
    ],
    technologies: ['Website management', 'Event logistics'],
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
