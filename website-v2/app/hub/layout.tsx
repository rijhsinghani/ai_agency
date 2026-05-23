import "../brand.css";
import "../hub.css";

/**
 * Layout for /hub — loads canonical brand tokens and hub styles.
 * Intentionally does NOT include the site Nav (no "Book a free audit" CTAs
 * on the hub; contact is DM-primary via Instagram).
 */
export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
