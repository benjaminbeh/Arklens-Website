/**
 * Privacy-conscious event helper.
 *
 * - Sends no personal data: only an event name and a few non-identifying props
 *   (for example the selected reason). Never pass names, emails or message text.
 * - Loads no third-party script. Events are forwarded to Cloudflare Zaraz if it
 *   is enabled on the zone, and are always dispatched as a DOM CustomEvent
 *   ("arklens:analytics") so a future provider can subscribe without code changes.
 */

export type AnalyticsEvent =
  | 'contact_form_view'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'contact_reason_selected';

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    zaraz?: { track: (name: string, props?: Props) => void };
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  try {
    window.zaraz?.track(event, props);
    window.dispatchEvent(new CustomEvent('arklens:analytics', { detail: { event, ...props } }));
  } catch {
    /* analytics must never break the page */
  }
}
