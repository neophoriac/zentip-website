import { getBlogPermalink, getPermalink } from './utils/permalinks';

// This file is the single source of truth for links shown in the site header and footer.
export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },
    { text: 'Pricing', href: getPermalink('/pricing') },
    { text: 'FAQ', href: getPermalink('/faq') },
    { text: 'Documentation', href: getPermalink('/documentation') },
    { text: 'Blog', href: getBlogPermalink() },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Zentip',
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'Pricing', href: getPermalink('/pricing') },
        { text: 'Documentation', href: getPermalink('/documentation') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'FAQ', href: getPermalink('/faq') },
        { text: 'Contact us', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [{ text: 'Privacy Policy', href: getPermalink('/privacy') }],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/neophoriac/zentip-website' },
  ],
  footNote: '© 2026 Zentip. All rights reserved.',
};
