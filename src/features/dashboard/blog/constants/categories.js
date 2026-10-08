import {
  PiNewspaperClippingBold,
  PiCalendarCheckBold,
  PiArrowBendUpRightBold,
  PiLightbulbFilamentBold,
  PiBookOpenTextBold,
  PiSparkleBold,
  PiMegaphoneBold,
  PiHandshakeBold,
  PiDotsThreeCircleBold,
} from "react-icons/pi";

export const BLOG_CATEGORIES = [
  {
    value: "news",
    label: "News",
    description:
      "External or campus sustainability news, policy changes, awards",
    icon: PiNewspaperClippingBold,
  },
  {
    value: "events",
    label: "Events",
    description: "Announcements/recaps for workshops, cleanups, swaps, talks",
    icon: PiCalendarCheckBold,
  },
  {
    value: "updates",
    label: "Updates",
    description: "Club updates, milestones, progress notes",
    icon: PiArrowBendUpRightBold,
  },
  {
    value: "projects",
    label: "Projects",
    description: "Ongoing/finished student and campus initiatives",
    icon: PiLightbulbFilamentBold,
  },
  {
    value: "tips-guides",
    label: "Tips & Guides",
    description: "How‑tos, checklists, lifestyle/saving tips",
    icon: PiBookOpenTextBold,
  },
  {
    value: "highlights",
    label: "Highlights",
    description: "Photo/recap pieces, best‑of, semester roundups",
    icon: PiSparkleBold,
  },
  {
    value: "announcements",
    label: "Announcements",
    description: "Formal statements, elections, new programs",
    icon: PiMegaphoneBold,
  },
  {
    value: "opportunities",
    label: "Opportunities",
    description: "Applications, volunteer signups, grants, internships",
    icon: PiHandshakeBold,
  },
  {
    value: "other",
    label: "Other",
    description: "Other categories not listed above",
    icon: PiDotsThreeCircleBold,
  },
];

export const ALLOWED_CATEGORIES = new Set(
  BLOG_CATEGORIES.map((category) => category.value)
);
