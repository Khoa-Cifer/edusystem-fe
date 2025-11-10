import { ResponseDto } from "@/interfaces/response-dto";
import { StudentResponse } from "@/interfaces/student";
import api from "./http";
import { FetchParams, UserRegistrationFormData } from "@/interfaces/user";
import { convertDateString } from "@/lib/utils";
import { useSonner } from "@/hooks/use-sonner";

const { showToast } = useSonner();

export class StudentApi {
  static async getStudents(
    params: FetchParams = {}
  ): Promise<ResponseDto<StudentResponse>> {
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
    const response = await api.get(`/student?${queryParams}`);
    return response.data;
  }

  static async studentRegister(
    data: UserRegistrationFormData
  ): Promise<ResponseDto<any>> {
    try {
      const response = await api.post("/auth/students-register", {
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
      console.error("Register failed:", error);
      const e: any = error;
      const message = e.response.data.message || "Please try again";
      showToast("error", {
        title: "Registration Failed",
        description: message,
      });
      throw error;
    }
  }
}
