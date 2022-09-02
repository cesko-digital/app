import { MarkdownString } from "lib/utils";
import { join } from "path";
import matter from "gray-matter";
import fs from "fs";

export interface PortalVideo {
  slug: string;
  title: string;
  cover: string;
  date: string;
  description: string;
  videoUrl: string;
  tags: string[];
  toc: PortalVideoSegment[];
  resources: PortalVideoResource[];
  credits: PortalVideoCredit[];
  transcript: MarkdownString;
}

export interface PortalVideoSegment {
  title: string;
  time: string;
  start: number;
}

export interface PortalVideoResource {
  type: "GitHub" | "Slack" | "Other";
  title: string;
  url: string;
}

export interface PortalVideoCredit {
  title: string;
  name: string;
}

const postsDirectory = join(process.cwd(), "content/cedu");

export function getVideoFilenames(): string[] {
  return fs.readdirSync(postsDirectory);
}

// TODO: It would be nice to add some validation logic here
export function getVideoByFilename(fileName: string): PortalVideo {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const {
    title,
    cover,
    date,
    description,
    videoUrl,
    tags,
    toc,
    resources,
    credits,
  } = data;

  return {
    slug,
    title,
    cover,
    date,
    description,
    videoUrl,
    tags,
    toc,
    resources,
    credits,
    transcript: { source: content },
  };
}

export async function getAllVideos(): Promise<PortalVideo[]> {
  return getVideoFilenames().map(getVideoByFilename);
}
