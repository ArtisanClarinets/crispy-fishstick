"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

type VTLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  disableViewTransition?: boolean;
};

export function VTLink({ href, onClick, disableViewTransition, ...props }: VTLinkProps) {
  const router = useRouter();
  const url = href;

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }

        event.preventDefault();
        const triggerScan = () =>
          window.dispatchEvent(new CustomEvent("route-transition-start"));

        const navigate = () => startTransition(() => router.push(url));

        if (disableViewTransition) {
          navigate();
          return;
        }

        const transition = (document as { startViewTransition?: (cb: () => void) => void }).startViewTransition;
        if (transition) {
          triggerScan();
          transition.call(document, () => navigate());
        } else {
          triggerScan();
          navigate();
        }
      }}
    />
  );
}
