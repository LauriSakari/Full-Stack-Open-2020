export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  key?: string;
}

export interface CourseNormalAndSubmissionPart extends CoursePartBase {
  type: string;
  description: string;
}

export interface CourseNormalPart extends CourseNormalAndSubmissionPart {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseNormalAndSubmissionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseNormalAndSubmissionPart {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;