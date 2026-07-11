interface IconProps {
  className?: string;
}

const BASE = "h-5 w-5";

export function FishIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M2 12c3-4.5 6.5-6 10-6s6.5 2 8 6c-1.5 4-4.5 6-8 6s-7-1.5-10-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 12l2-3v6l-2-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M3 7h10v9H3V7Zm10 3h4l3 3v3h-7v-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function LeafIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M5 19c0-8 5-13 14-14 0 10-5 14-11 14H5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 19c3-5 7-8 11-9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${BASE} ${className}`}>
      <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z" />
    </svg>
  );
}

export function WhatsappIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${BASE} ${className}`}>
      <path d="M12.04 2A9.9 9.9 0 0 0 2.13 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01a9.9 9.9 0 0 0 9.9-9.9A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.19 8.19 0 1 1 6.97 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.74 2.66 4.22 3.73.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function ChatIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.2-4.2A8 8 0 1 1 21 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="13" cy="12" r="1" fill="currentColor" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M5 12h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M12 21c4-4.5 6-7.7 6-10.5A6 6 0 0 0 6 10.5C6 13.3 8 16.5 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
