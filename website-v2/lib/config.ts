/**
 * Site-wide configurable values — change here, reflects everywhere.
 * These are NOT secrets; they are public-facing contact handles and social links.
 * Cal.com / booking-call CTA is intentionally absent (decision E4-override: DM+text only).
 */
export const SITE_CONFIG = {
  /** Instagram handle without the @, used for both display and the link */
  igHandle: "sameer_rijhsinghani",
  igUrl: "https://instagram.com/sameer_rijhsinghani",

  /** Direct contact phone number — displayed as text, linked via tel: */
  contactPhone: "732-939-0828",
  contactPhoneTel: "tel:+17329390828",

  /** Plausible analytics domain */
  plausibleDomain: "sameerautomations.com",

  /** Canonical site URL */
  siteUrl: "https://sameerautomations.com",
} as const;
