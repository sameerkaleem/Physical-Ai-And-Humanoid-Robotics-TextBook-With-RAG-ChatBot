import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/login',
    component: ComponentCreator('/login', 'a8c'),
    exact: true
  },
  {
    path: '/profile',
    component: ComponentCreator('/profile', 'ef2'),
    exact: true
  },
  {
    path: '/register',
    component: ComponentCreator('/register', 'd3b'),
    exact: true
  },
  {
    path: '/simple-login',
    component: ComponentCreator('/simple-login', '588'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '21f'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '966'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '6bd'),
            routes: [
              {
                path: '/docs/control-loops/',
                component: ComponentCreator('/docs/control-loops/', 'be5'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/emergent-intelligence/',
                component: ComponentCreator('/docs/emergent-intelligence/', '6f5'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/introduction',
                component: ComponentCreator('/docs/introduction', 'a68'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/physical-interaction/',
                component: ComponentCreator('/docs/physical-interaction/', '2d1'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/sensing-actuation/',
                component: ComponentCreator('/docs/sensing-actuation/', '256'),
                exact: true,
                sidebar: "textbookSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
