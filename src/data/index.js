import { courses } from "./courses";
import { resumes } from "./resumes";
import { tutorials } from "./tutorials";

export const CONTENT_TYPE = {
  TUTORIAL: "tutorial",
  RESUME: "resume",
  FREE_COURSE: "free-course",
  PAID_COURSE: "paid-course",
};

export const CONTENT_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
};

const content = [...courses, ...tutorials, ...resumes];

export { content, courses, resumes, tutorials };
