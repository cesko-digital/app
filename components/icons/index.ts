import { type StaticImageData } from "next/image";

import { default as Airtable } from "./airtable.png";
import { default as Asana } from "./asana.png";
import { default as Confluence } from "./confluence.png";
import { default as GoogleDocs } from "./docs.png";
import { default as Figma } from "./figma.png";
import { default as GitHub } from "./github.png";
import { default as Globe } from "./globe.png";
import { default as Gmail } from "./gmail.png";
import { default as GoogleCalendar } from "./google-calendar.png";
import { default as GoogleDrive } from "./google-drive.png";
import { default as Jira } from "./jira.png";
import { default as LinkedIn } from "./linkedin.png";
import { default as Miro } from "./miro.png";
import { default as Slack } from "./slack.png";
import { default as Trello } from "./trello.png";
import { default as YouTube } from "./youtube.png";

export const Icons = {
  Airtable,
  Asana,
  Confluence,
  Figma,
  GitHub,
  GoogleCalendar,
  GoogleDrive,
  GoogleDocs,
  Globe,
  Gmail,
  Jira,
  LinkedIn,
  Miro,
  Slack,
  Trello,
  YouTube,
};

const iconMap = {
  "cesko-digital.slack.com": Icons.Slack,
  "app.slack.com": Icons.Slack,
  "github.com": Icons.GitHub,
  "cesko-digital.atlassian.net/jira": Icons.Jira,
  "trello.com": Icons.Trello,
  "cesko-digital.atlassian.net": Icons.Confluence,
  "miro.com": Icons.Miro,
  "youtube.com": Icons.YouTube,
  "app.asana.com": Icons.Asana,
  "calendar.google.com": Icons.GoogleCalendar,
  "docs.google.com": Icons.GoogleDocs,
  "drive.google.com": Icons.GoogleDrive,
  "linkedin.com": Icons.LinkedIn,
  "figma.com": Icons.Figma,
  "airtable.com": Icons.Airtable,
};

/**
 * Return icon image data for given URL
 *
 * If no specific icon was found, a generic globe icon is returned.
 */
export function iconForUrl(url: string): StaticImageData {
  if (url.startsWith("mailto://")) {
    return Icons.Gmail;
  }

  try {
    // This can throw for non-well formed URLs
    const host = new URL(url).hostname.replace("www.", "");
    for (const [page, icon] of Object.entries(iconMap)) {
      if (host.startsWith(page)) {
        return icon;
      }
    }
    return Icons.Globe;
  } catch {
    return Icons.Globe;
  }
}
