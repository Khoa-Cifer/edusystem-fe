import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams, UserRegistrationFormData } from "@/interfaces/user";
import api from "./http";
import { convertDateString } from "@/lib/utils";
import { showNotification } from "@/components/notification-helper";
import { TeacherResponse } from "@/interfaces/teacher";

export class TeacherApi {
  static async getTeachers(
    params: FetchParams = {}
  ): Promise<ResponseDto<TeacherResponse>> {
    const {
      pageNumber = 1,
      pageSize = 10,
      filterQuery = "",
      sortBy = "asc",
    } = params;

    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      filterOn: "",
      filterQuery: filterQuery,
      sortBy,
    });
    const response = await api.get(`/teacher?${queryParams}`);
    return response.data;
  }

  static async teacherRegister(
    data: UserRegistrationFormData
  ): Promise<ResponseDto<any>> {
    try {
      const response = await api.post("/auth/teacher-register", {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber,
        fullName: data.fullName,
        address: data.address,
        gender: data.gender,
        birthDate: convertDateString(data.birthDate),
      });
      return response.data;
    } catch (error) {
      console.error("Create account failed:", error);
      const e: any = error;
      const message = e.response.data.message || "Please try again";
      showNotification.error("Create Account Failed", message);
      throw error;
    }
  }
}
