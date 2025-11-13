import { ApplicationUser } from "./user";

export interface Teacher {
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherDOB: string;
  gender: string;
  address: string;
  imageUrl: string;
  status: number;
  teacherCode: string;
  teachingExperience: string;
}

export interface TeacherResponse {
  data: Teacher[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
