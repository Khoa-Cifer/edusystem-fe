import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class QuizApi {
  // Get all quizzes with pagination
  static async getQuizzes(
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

    const response = await api.get(`/quizzes?${queryParams}`);
    return response.data;
  }

  // Get single quiz by ID
  static async getQuizById(quizId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  }

  // Create new quiz
  static async createQuiz(quizData: {
    matrixId: string;
    quizName: string;
    englishLevel: string;
    skill: string;
    description: string;
    duration: number;
    passingScore: number;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/quizzes", quizData);
    return response.data;
  }

  // Update existing quiz
  static async updateQuiz(
    quizId: string,
    quizData: {
      quizId: string;
      matrixId: string;
      quizName: string;
      englishLevel: string;
      skill: string;
      description: string;
      duration: number;
      passingScore: number;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/quizzes/${quizId}`, quizData);
    return response.data;
  }

  // Delete quiz
  static async deleteQuiz(quizId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/quizzes/${quizId}`);
    return response.data;
  }
}
