/**
 * Public profiles surfaced in the footer. Icons come from the bundled Iconify
 * `simple-icons` set, so they stay monochrome and inherit the surrounding text
 * colour like the rest of the UI.
 *
 * To add or hide a profile, edit `href` — an empty string keeps the slot here
 * as a reminder without rendering a dead link. Both `simple-icons:x` and
 * `simple-icons:twitter` are already in the icon bundle, so switching logos
 * needs no rebuild.
 */
const profiles = [
  {
    label: "GitHub",
    href: "https://github.com/Yaswanth6303",
    icon: "simple-icons:github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yaswanthgudivada/",
    icon: "simple-icons:linkedin",
  },
  {
    label: "X",
    href: "",
    icon: "simple-icons:x",
  },
]

export const socialLinks = profiles.filter((profile) => profile.href !== "")
