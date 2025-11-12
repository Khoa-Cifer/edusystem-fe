import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class MatrixDetailApi {
  // Get all matrix details with pagination
  static async getMatrixDetails(
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

    const response = await api.get(`/matrix-details?${queryParams}`);
    return response.data;
  }

  // Get single matrix detail by ID
  static async getMatrixDetailById(detailId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/matrix-details/${detailId}`);
    return response.data;
  }

  // Create new matrix detail
  static async createMatrixDetail(detailData: {
    matrixId: string;
    level: number;
    questionType: number;
    skillType: string;
    questionCount: number;
    scorePerQuestion: number;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/matrix-details", detailData);
    return response.data;
  }

  // Update existing matrix detail
  static async updateMatrixDetail(
    detailId: string,
    detailData: {
      detailId: string;
      level: number;
      questionType: number;
      skillType: string;
      questionCount: number;
      scorePerQuestion: number;
      status: string;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/matrix-details/${detailId}`, detailData);
    return response.data;
  }

  // Delete matrix detail
  static async deleteMatrixDetail(detailId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/matrix-details/${detailId}`);
    return response.data;
  }
}
