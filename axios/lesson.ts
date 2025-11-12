import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class LessonApi {
  // Get all lessons with pagination
  static async getLessons(
    params: FetchParams = {}
  ): Promise<ResponseDto<any>> {
    const {
      pageNumber = 1,
      pageSize = 10,
      filterQuery = "",
      filterOn = "",
      sortBy = "asc",
    } = params;

    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      filterOn: filterOn,
      filterQuery: filterQuery,
      sortBy,
    });

    const response = await api.get(`/lessons?${queryParams}`);
    return response.data;
  }

  // Get single lesson by ID
  static async getLessonById(lessonId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/lessons/${lessonId}`);
    return response.data;
  }

  // Create new lesson
  static async createLesson(lessonData: any): Promise<ResponseDto<any>> {
    const response = await api.post("/lessons", lessonData);
    return response.data;
  }

  // Update existing lesson
  static async updateLesson(
    lessonId: string,
    lessonData: any
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/lessons/${lessonId}`, lessonData);
    return response.data;
  }

  // Delete lesson
  static async deleteLesson(lessonId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/lessons/${lessonId}`);
    return response.data;
  }
}
