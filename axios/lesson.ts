import { LessonContentResponse, LessonResponse } from "@/interfaces/lesson";
import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class LessonApi {
  static async getLessons(
    params: FetchParams = {}
  ): Promise<ResponseDto<LessonResponse>> {
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
    const response = await api.get(`/lesson/get/all?${queryParams}`);
    return response.data;
  }

  static async getLessonContents(
    params: FetchParams = {}
  ): Promise<ResponseDto<LessonContentResponse>> {
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
    const response = await api.get(`/lesson-contents?${queryParams}`);
    return response.data;
  }
}
