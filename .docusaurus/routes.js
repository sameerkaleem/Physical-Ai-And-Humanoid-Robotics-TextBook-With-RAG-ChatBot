import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', '109'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '6a1'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '63e'),
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
