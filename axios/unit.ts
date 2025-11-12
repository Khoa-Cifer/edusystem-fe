import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class UnitApi {
  // Get all units with pagination
  static async getUnits(
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

    const response = await api.get(`/units?${queryParams}`);
    return response.data;
  }

  // Get single unit by ID
  static async getUnitById(unitId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/units/${unitId}`);
    return response.data;
  }

  // Create new unit
  static async createUnit(unitData: {
    unitName: string;
    englishLevel: string;
    description: string;
    learningObjectives: string;
    orderIndex: number;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/units", unitData);
    return response.data;
  }

  // Update existing unit
  static async updateUnit(
    unitId: string,
    unitData: {
      unitId: string;
      unitName: string;
      englishLevel: string;
      description: string;
      learningObjectives: string;
      orderIndex: number;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/units/${unitId}`, unitData);
    return response.data;
  }

  // Delete unit
  static async deleteUnit(unitId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/units/${unitId}`);
    return response.data;
  }
}
