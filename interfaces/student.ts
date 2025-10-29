export interface ApplicationUser {
  fullName: string;
  birthDate: string;
  address: string;
  gender: string;
  imageUrl: string;
  status: string;
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  emailConfirmed: boolean;
}

export interface Student {
  studentId: string;
  userId: string;
  applicationUser: ApplicationUser;
  studentCode: string;
  status: number;
  class: string | null;
  grade: string | null;
  school: string | null;
  enrollmentDate: string | null;
  graduationDate: string | null;
}

export interface StudentResponse {
  data: Student[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
