export interface Lesson {
  lessonId: string;
  unitName: string;
  lessonName: string;
  skill: string;
  content: string;
  duration: number;
  orderIndex: number;
  status: string;
  createBy: string | null;
  createTime: string | null;
  updateBy: string | null;
  updateTime: string | null;
}

export interface LessonResponse {
  data: Lesson[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface LessonContent {
  lessonContentId: string;
  lessonId: string;
  resourceType: string;
  resourceUrl: string;
  description: string;
  status: string;
  createdBy: string;
  createdTime: string;
  updatedBy?: string | null;
  updatedTime?: string | null;
}

export interface LessonContentResponse {
  data: LessonContent[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}