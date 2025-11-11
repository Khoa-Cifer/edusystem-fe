import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";
import { QuestionResponse } from "@/interfaces/question";

export class QuestionApi {
  static async getQuestions(
    params: FetchParams = {}
  ): Promise<ResponseDto<QuestionResponse>> {
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

    const response = await api.get(`/questions?${queryParams}`);
    return response.data;
  }
}
