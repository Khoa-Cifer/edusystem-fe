export interface Matrix {
  matrixId: string
  name: string
  englishLevel: string
  skillFocus: string
  description: string
  status: string
  createdBy: string
  createdTime: string
  updatedBy: string | null
  updatedTime: string | null
}

export interface MatrixResponse {
  data: Matrix[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
