// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */


const config = {
  title: 'Physical AI & Humanoid Robotics with RAG Chatbot by Sameer',
  tagline: 'Understanding intelligence as an emergent property of embodied systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },
  
  url: 'https://book.vercel.app', // Actual Vercel domain
  baseUrl: '/',
  organizationName: 'sameerkaleem',
  projectName: 'book',
  deploymentBranch: 'main',

  onBrokenLinks: 'warn',


  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sameerkaleem',
          // Configure MDX for interactive content
          remarkPlugins: [
            // Add any remark plugins for additional markdown processing
          ],
          rehypePlugins: [
            // Add any rehype plugins for HTML processing
          ],
        },
        blog: false, // Disable blog functionality as we're creating a textbook
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Physical AI Textbook',
        logo: {
          alt: 'Physical AI Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'textbookSidebar',
            position: 'left',
            label: 'Textbook',
          },
          {
            href: 'https://github.com/sameerkaleem',
            label: "Sameer's GitHub",
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Textbook',
            items: [
              {
                label: 'TextBook',
                to: '/docs/sensing-actuation',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label:  "Sameer's GitHub",
                href: 'https://github.com/sameerkaleem',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI and Humanoid Robotics. Built by Sameer with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
