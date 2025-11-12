import { ResponseDto } from "@/interfaces/response-dto";
import { FetchParams } from "@/interfaces/user";
import api from "./http";

export class QuizAttemptApi {
  // Get all quiz attempts with pagination
  static async getQuizAttempts(
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

    const response = await api.get(`/quiz-attempts?${queryParams}`);
    return response.data;
  }

  // Get quiz attempts by quiz ID
  static async getQuizAttemptsByQuizId(
    quizId: string,
    params: { pageNumber?: number; pageSize?: number } = {}
  ): Promise<ResponseDto<any>> {
    const { pageNumber = 1, pageSize = 10 } = params;

    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await api.get(`/quiz-attempts/by-quiz/${quizId}?${queryParams}`);
    return response.data;
  }

  // Get quiz attempts by student ID
  static async getQuizAttemptsByStudentId(
    studentId: string,
    params: { pageNumber?: number; pageSize?: number } = {}
  ): Promise<ResponseDto<any>> {
    const { pageNumber = 1, pageSize = 10 } = params;

    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await api.get(`/quiz-attempts/by-student/${studentId}?${queryParams}`);
    return response.data;
  }

  // Create new quiz attempt
  static async createQuizAttempt(attemptData: {
    quizId: string;
    studentId: string;
    startTime: string;
    endTime: string;
    score: number;
  }): Promise<ResponseDto<any>> {
    const response = await api.post("/quiz-attempts", attemptData);
    return response.data;
  }

  // Update existing quiz attempt
  static async updateQuizAttempt(
    quizAttemptId: string,
    attemptData: {
      quizAttemptId: string;
      endTime: string;
      score: number;
    }
  ): Promise<ResponseDto<any>> {
    const response = await api.put(`/quiz-attempts/${quizAttemptId}`, attemptData);
    return response.data;
  }
}
