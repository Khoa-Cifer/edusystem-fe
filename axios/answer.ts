import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class AnswerApi {
  // Get all answers with pagination
  static async getAnswers(
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

    const response = await api.get(`/answer?${queryParams}`);
    return response.data;
  }

  // Get single answer by ID
  static async getAnswerById(answerId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/answer/${answerId}`);
    return response.data;
  }

  // Get answers by question ID
  static async getAnswersByQuestionId(questionId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/answer/by-question/${questionId}`);
    return response.data;
  }

  // Create new answer
  static async createAnswer(answerData: {
    questionId: string;
    content: string;
    isCorrect: boolean;
    explanation: string;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/answer", answerData);
    return response.data;
  }

  // Update existing answer
  static async updateAnswer(
    answerId: string,
    answerData: {
      answerId: string;
      content: string;
      isCorrect: boolean;
      explanation: string;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/answer/${answerId}`, answerData);
    return response.data;
  }

  // Delete answer
  static async deleteAnswer(answerId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/answer/${answerId}`);
    return response.data;
  }
}
