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

  // Get single question by ID
  static async getQuestionById(questionId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/questions/${questionId}`);
    return response.data;
  }

  // Create new question
  static async createQuestion(questionData: {
    title: string;
    content: string;
    questionType: string;
    level: string;
    skillType: string;
    englishLevel: string;
    score: number;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/questions", questionData);
    return response.data;
  }

  // Update existing question
  static async updateQuestion(
    questionId: string,
    questionData: {
      questionId: string;
      title: string;
      content: string;
      questionType: string;
      level: string;
      skillType: string;
      englishLevel: string;
      score: number;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/questions/${questionId}`, questionData);
    return response.data;
  }

  // Delete question
  static async deleteQuestion(questionId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/questions/${questionId}`);
    return response.data;
  }
}
