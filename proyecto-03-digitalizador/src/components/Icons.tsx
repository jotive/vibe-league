interface IconProps {
  className?: string;
}

const BASE = "h-5 w-5";

export function SparkIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ListIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M9 6h11M9 12h11M9 18h11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="4.5" cy="6" r="1.4" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.4" fill="currentColor" />
      <circle cx="4.5" cy="18" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function AlertIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M12 4.5 3 19.5h18L12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.6" r="1" fill="currentColor" />
    </svg>
  );
}

export function TagIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M4 4h7l9 9-7 7-9-9V4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="8.2" r="1.5" fill="currentColor" />
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

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 1.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export function DownloadIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${BASE} ${className}`}>
      <path
        d="M12 4v10m0 0 4-4m-4 4-4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
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
