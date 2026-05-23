import "../brand.css";
import "../hub.css";

/**
 * Layout for all /guides/* pages — shares hub brand tokens and component styles.
 * Intentionally does NOT include the site Nav.
 */
export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
