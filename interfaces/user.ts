export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  address: string;
  age: number;
  imageUrl: string;
  userName: string;
  roles: string[];
}

export interface UserRegistrationFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: string;
  birthDate: string;
}

export interface FetchParams {
  pageNumber?: number;
  pageSize?: number;
  filterOn?: string;
  filterQuery?: string;
  sortBy?: "asc" | "desc";
}

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