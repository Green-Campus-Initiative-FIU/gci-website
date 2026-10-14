// Small inline icons shared across the site.

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.8a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3zM12 2c-2.7 0-3 0-4.1.1C4.3 2.2 2.2 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.1 3.6 2.2 5.7 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.1 5.7-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.1-3.6-2.2-5.7-5.8-5.8C15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.6.1 3.9 1.4 4 4 .1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.6-1.4 3.9-4 4-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.6-.1-3.9-1.4-4-4-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2.6 1.4-3.9 4-4 1-.1 1.3-.1 4-.1z" />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6.9 21H3.3V9h3.6v12zM5.1 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM21 21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.6V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21z" />
    </svg>
  );
}

export function EmailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 5h18v14H3zm2 2v.5l7 4.5 7-4.5V7zm14 2.9l-7 4.5-7-4.5V17h14z" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" {...props}>
      <path d="M1 7h15M10 1l6 6-6 6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Committee icons, drawn in the logo's mint and the sun gold.
const COMMITTEE_ICONS = {
  recycle: (
    <path d="M7 14l-2.5 4.3h6M17 14l2.5 4.3h-6M12 4.5l2.8 4.8M12 4.5L9.2 9.3M9.2 9.3l-2.8-.2M14.8 9.3l1.6-2.2" stroke="#B8DAAE" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" fill="#E3A72F" stroke="#B8DAAE" strokeWidth="1.5" strokeLinejoin="round" />,
  bike: (
    <>
      <circle cx="6.5" cy="15.5" r="3.5" stroke="#B8DAAE" strokeWidth="2" fill="none" />
      <circle cx="17.5" cy="15.5" r="3.5" stroke="#B8DAAE" strokeWidth="2" fill="none" />
      <path d="M6.5 15.5L10 9h5l2.5 6.5M10 9l2.5 6.5M9 6.5h3" stroke="#B8DAAE" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" fill="#B8DAAE" />
      <path d="M6 18c3-5 6-8 10-10" stroke="#0F4D2B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ),
  mega: (
    <>
      <path d="M5 10l10-4v12L5 14z" fill="#E3A72F" stroke="#B8DAAE" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 9.5c1 1.5 1 3.5 0 5" stroke="#B8DAAE" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  campus: (
    <>
      <path d="M4 20V10l8-5 8 5v10z" fill="none" stroke="#B8DAAE" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5" stroke="#B8DAAE" strokeWidth="2" fill="none" />
      <path d="M12 12.5c0-2 1.2-3.2 3.2-3.4-.1 2-1.3 3.3-3.2 3.4z" fill="#E3A72F" />
    </>
  ),
};

export function CommitteeIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {COMMITTEE_ICONS[name] || COMMITTEE_ICONS.leaf}
    </svg>
  );
}
