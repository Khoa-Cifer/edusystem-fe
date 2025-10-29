import { ApplicationUser } from "./user";

export interface Teacher {
  teacherId: string;
  userId: string;
  applicationUser: ApplicationUser;
  teacherCode: string;
  status: number;
  department: string | null;
  specialization: string | null;
  position: string | null;
  hireDate: string | null;
  degree: string | null;
  bio: string | null;
  englishProficiency: string | null;
  certifications: string | null;
  teachingExperience: string | null;
  officePhone: string | null;
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
