import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";
import { MatrixResponse } from "@/interfaces/matrix";

export class MatrixApi {
  static async getMatrices(
    params: FetchParams = {}
  ): Promise<ResponseDto<MatrixResponse>> {
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

    const response = await api.get(`/matrices?${queryParams}`);
    return response.data;
  }

  // Get single matrix by ID
  static async getMatrixById(matrixId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/matrices/${matrixId}`);
    return response.data;
  }

  // Create new matrix
  static async createMatrix(matrixData: {
    name: string;
    englishLevel: string;
    skillFocus: string;
    description: string;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/matrices", matrixData);
    return response.data;
  }

  // Update existing matrix
  static async updateMatrix(
    matrixId: string,
    matrixData: {
      matrixId: string;
      name: string;
      englishLevel: string;
      skillFocus: string;
      description: string;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/matrices/${matrixId}`, matrixData);
    return response.data;
  }

  // Delete matrix
  static async deleteMatrix(matrixId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/matrices/${matrixId}`);
    return response.data;
  }
}
