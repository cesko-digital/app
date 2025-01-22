import { type StaticImageData } from "next/image";

import { Globe } from "./generic";
import {
  Airtable,
  Asana,
  Confluence,
  Figma,
  Diskutuj,
  GitHub,
  Gmail,
  GoogleCalendar,
  GoogleDocs,
  GoogleDrive,
  Jira,
  LinkedIn,
  Miro,
  Slack,
  Trello,
  YouTube,
} from "./services";

const iconMap: Record<string, StaticImageData> = {
  "cesko-digital.slack.com": Slack,
  "app.slack.com": Slack,
  "github.com": GitHub,
  "cesko-digital.atlassian.net/jira": Jira,
  "trello.com": Trello,
  "cesko-digital.atlassian.net": Confluence,
  "miro.com": Miro,
  "youtube.com": YouTube,
  "app.asana.com": Asana,
  "calendar.google.com": GoogleCalendar,
  "docs.google.com": GoogleDocs,
  "drive.google.com": GoogleDrive,
  "linkedin.com": LinkedIn,
  "figma.com": Figma,
  "airtable.com": Airtable,
  "diskutuj.digital": Diskutuj,
};

/**
 * Return icon image data for given URL
 *
 * If no specific icon was found, a generic globe icon is returned.
 */
export function iconForUrl(url: string): StaticImageData {
  if (url.startsWith("mailto:")) {
    return Gmail;
  }

  try {
    // This can throw for non-well formed URLs
    const host = new URL(url).hostname.replace("www.", "");
    for (const [page, icon] of Object.entries(iconMap)) {
      if (host.startsWith(page)) {
        return icon;
      }
    }
    return Globe;
  } catch {
    return Globe;
  }
}
