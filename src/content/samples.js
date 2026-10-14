// Sample content shown only while the site isn't connected to Firebase,
// so the design can be previewed. Real posts come from the "posts" collection.
export const SAMPLE_POSTS = [
  {
    id: "sample-plastic-free-events",
    title: "Why FIU should go plastic-free at events",
    description:
      "Every campus event leaves behind cups, cutlery, and wrappers that are used for minutes and last for centuries.\n\nThis is a sample post. Once the site is connected to Firebase, real posts written in the dashboard appear here instead.",
    category: "projects",
    tags: ["plastics", "research", "policy"],
    featuredImageUrl: "/greenhouse.jpg",
    authorName: "GCI Research Committee",
    authorRole: "Committee",
    published: true,
    featured: true,
    publishedAt: "2026-10-02T12:00:00Z",
  },
  {
    id: "sample-fall-kickoff",
    title: "Fall kickoff recap",
    description: "A recap of our first general meeting of the semester.\n\nThis is a sample post.",
    category: "events",
    tags: ["meetings", "members"],
    featuredImageUrl: "/outdoor.jpg",
    authorName: "GCI Officers",
    authorRole: "Officers",
    published: true,
    featured: true,
    publishedAt: "2026-09-18T12:00:00Z",
  },
  {
    id: "sample-refill-stations",
    title: "Where to refill your bottle on campus",
    description: "A quick guide to the water refill stations at MMC and BBC.\n\nThis is a sample post.",
    category: "tips-guides",
    tags: ["tips", "water"],
    featuredImageUrl: "/library.jpg",
    authorName: "Outreach Committee",
    authorRole: "Committee",
    published: true,
    publishedAt: "2026-09-05T12:00:00Z",
  },
  {
    id: "sample-committee-leads",
    title: "Committee leads wanted for spring",
    description: "Want to run a project? We're looking for new committee leads.\n\nThis is a sample post.",
    category: "opportunities",
    tags: ["leadership"],
    featuredImageUrl: "/bamboo.jpeg",
    authorName: "GCI Officers",
    authorRole: "Officers",
    published: true,
    publishedAt: "2026-08-29T12:00:00Z",
  },
];

export const SAMPLE_EVENTS = [
  {
    date: "2026-10-23",
    title: "General meeting",
    time: "6:00 PM",
    where: "Modesto Maidique Campus",
    description: "Open to all students. Meet the committees and hear what's coming up this semester.",
  },
  {
    date: "2026-11-06",
    title: "Plastic-free pledge tabling",
    time: "11:00 AM – 2:00 PM",
    where: "Graham Center",
    description: "Take the pledge, grab a reusable bottle, and learn where the refill stations are.",
  },
];

export const SAMPLE_TEAM = [
  { name: "Officer name", role: "President", bio: "One or two sentences about this officer." },
  { name: "Officer name", role: "Vice President", bio: "One or two sentences about this officer." },
  { name: "Officer name", role: "Treasurer", bio: "One or two sentences about this officer." },
  { name: "Officer name", role: "Secretary", bio: "One or two sentences about this officer." },
];
