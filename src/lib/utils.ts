import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SocialMediaPost {
  id: string;
  videoId?: string;
  platform: "tiktok" | "instagram" | "facebook" | "twitter" | "x";
  type: "video" | "image" | "post";
  handle?: string;
  title?: string;
  url: string;
  localPath: string;
  thumbnail: string;
  editorialPhoto?: string;
  caption: string;
  date: string;
  permalink: string;
  duration?: number;
  views?: number;
  likes?: number;
  comments?: number;
  reposts?: number;
  location?: string;
  ejeSlug?: string;
}

export interface SocialFeedCatalog {
  brand?: {
    name: string;
    tseNumber: number;
    logo: string;
    socials: {
      instagram: string;
      facebook: string;
      tiktok: string;
    };
  };
  posts: SocialMediaPost[];
}

export function getSocialFeedPosts(
  data: SocialFeedCatalog | SocialMediaPost[]
): SocialMediaPost[] {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.posts) ? data.posts : [];
}
