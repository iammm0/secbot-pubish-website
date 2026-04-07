import type { SVGProps } from "react";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props} />;
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M12 2.7a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.6v-2.2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 1 .1 1.6-.7 1.8-1.1-.9-.1-1.9-.4-2.7-1.2-.8-.8-1.1-1.8-1.1-3.2 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.1 9.1 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 1.4-.4 2.4-1.1 3.2-.8.8-1.8 1.1-2.8 1.2.2.2.4.6.4 1.3v2c0 .4.2.7.7.6A9.8 9.8 0 0 0 12 2.7Z" />
    </IconBase>
  );
}

export function NpmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3" y="7" width="18" height="10" />
      <path d="M6 15V9h3v6M9 9h3v4h-3M12 9h3v6h-3M15 9h3v6" />
    </IconBase>
  );
}

export function PypiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M6 6h7a4 4 0 1 1 0 8H9v4H6V6Z" />
      <path d="M9 10h4a1 1 0 1 0 0-2H9v2Z" />
      <path d="M15 14h3v4h-3z" />
    </IconBase>
  );
}
