
export interface Question {
  questionId: string
  teacherId: string
  teacherName: string
  content: string
  questionType: string
  level: string
  skillType: string
  englishLevel: string
  score: number
  status: string
  createdBy: string
  createdTime: string
  updatedBy?: string | null
  updatedTime?: string | null
}

export interface QuestionResponse {
  data: Question[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}