import { ResponseDto } from "@/interfaces/response-dto";
import { StudentResponse } from "@/interfaces/student";
import api from "./http";

interface FetchStudentsParams {
  pageNumber?: number;
  pageSize?: number;
  filterQuery?: string;
  sortBy?: "asc" | "desc";
}

export class StudentApi {
  static async getStudents(
    params: FetchStudentsParams = {}
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
      filterQuery: filterQuery || "fullName",
      sortBy,
    });
    const response = await api.get(`/student?${queryParams}`);
    return response.data;
  }
}
