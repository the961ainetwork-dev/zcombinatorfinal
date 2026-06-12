export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Story {
  id: string;
  title: string;
  url?: string;
  text?: string;
  author: string;
  timestamp: string;
  points: number;
  commentsCount: number;
  comments: Comment[];
  category: "all" | "tech" | "economy" | "news" | "ask" | "show";
  voters: string[];
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  industry: string;
  stage: string;
  city: string;
  website: string;
  funding: string;
  founder: string;
  founded: string;
  teamSize: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  timestamp: string;
  points?: number;
  commentsCount?: number;
}
