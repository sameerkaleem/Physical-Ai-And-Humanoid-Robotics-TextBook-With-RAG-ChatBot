// @ts-check
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
/**
 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Physical AI and Humanoid Robotics',
      items: [
        'sensing-actuation/sensing-actuation',
        'control-loops/control-loops',
        'physical-interaction/physical-interaction',
        'emergent-intelligence/emergent-intelligence'
      ],
    },
  ],
};

export default sidebars;