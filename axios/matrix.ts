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

    const response = await api.get(`/matrix/get/all?${queryParams}`);
    return response.data;
  }
}
