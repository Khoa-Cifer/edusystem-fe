import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class LessonContentApi {
  // Get all lesson contents with pagination
  static async getLessonContents(
    params: FetchParams = {}
  ): Promise<ResponseDto<any>> {
    const {
      pageNumber = 1,
      pageSize = 100,
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

    const response = await api.get(`/lesson-contents?${queryParams}`);
    return response.data;
  }

  // Get single lesson content by ID
  static async getLessonContentById(lessonContentId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/lesson-contents/${lessonContentId}`);
    return response.data;
  }

  // Get lesson contents by lessonId using filterOn
  static async getLessonContentsByLessonId(
    lessonId: string,
    params: Omit<FetchParams, "filterOn" | "filterQuery"> = {}
  ): Promise<ResponseDto<any>> {
    const {
      pageNumber = 1,
      pageSize = 100,
      sortBy = "asc",
    } = params;

    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      filterOn: "lessonId",
      filterQuery: lessonId,
      sortBy,
    });

    const response = await api.get(`/lesson-contents?${queryParams}`);
    return response.data;
  }

  // Create new lesson content
  static async createLessonContent(contentData: {
    lessonId: string;
    resourceType: string;
    resourceUrl: string;
    description: string;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/lesson-contents", contentData);
    return response.data;
  }

  // Update existing lesson content
  static async updateLessonContent(
    lessonContentId: string,
    contentData: {
      lessonContentId: string;
      lessonId: string;
      resourceType: string;
      resourceUrl: string;
      description: string;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/lesson-contents`, contentData);
    return response.data;
  }

  // Delete lesson content
  static async deleteLessonContent(lessonContentId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/lesson-contents/${lessonContentId}`);
    return response.data;
  }
}
