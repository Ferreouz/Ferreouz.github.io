import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "http://localhost:4321/", // replace this with your deployed domain
  author: "Gabriel Ferreira",
  profile: "https://github.com/Ferreouz",
  desc: "A simple blog.",
  title: "A tech blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Ferreouz",
    linkTitle: `${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/gabrielferreira-g",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:g.f.guimaraes@hotmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    active: true,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://t.me/ferreouz",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  },
];
