import { ResponseDto } from "@/interfaces/response-dto";
import api from "./http";

export class QuizQuestionApi {
  // Get all quiz attempts with pagination
  static async getQuizQuestions(quizId: string): Promise<ResponseDto<any>> {
    const response = await api.get(`/quiz-questions/by-quiz/${quizId}`);
    return response.data;
  }

  static async createQuizQuestions(
    quizId: string,
    questionId: string,
    questionOrder: number
  ): Promise<ResponseDto<any>> {
    const response = await api.post(`/quiz-questions`, {
      quizId: quizId,
      questionId: questionId,
      questionOrder: questionOrder,
    });
    return response.data;
  }

  static async deleteQuestionsFromQuiz(quizId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/quiz-questions/by-quiz/${quizId}`);
    return response.data;
  }

  static async deleteQuizQuestion(quizQuestionId: string): Promise<ResponseDto<any>> {
    const response = await api.delete(`/quiz-questions/${quizQuestionId}`);
    return response.data;
  }

  static async deleteQuizQuestionByQuizAndQuestion(
    quizId: string,
    questionId: string
  ): Promise<ResponseDto<any>> {
    const response = await api.delete(`/quiz-questions/by-quiz/${quizId}/by-question/${questionId}`);
    return response.data;
  }
}
