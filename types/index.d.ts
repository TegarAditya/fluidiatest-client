declare global {
  interface User {
    public_id: string
    name: string
    email: string
    school: string
  }
  interface TestMeta {
    userId: string
    testId: string
    duration: number
    startedAt: Date
    closedAt: Date
    finishedAt: Date
  }

  interface Test {
    id: string
    code: string
    description: string
    isActive: boolean
    isMultiTier: boolean
    type: null
    duration: number
    questions: Question[]
  }

  interface Question {
    id: number
    question: string
    options: Option[]
    reasons: Reason[]
  }

  interface Option {
    id: number
    label: string
    option: string
  }

  interface Reason {
    id: number
    label: string
    reason: string
  }

  interface Answer {
    questionId: number
    optionId: number
    reasonId: number
  }

  export interface ExamResultResponse {
    id: string
    createdAt: Date
    updatedAt: Date
    user: UserExamresult
    responses: ExamResponse[]
  }

  export interface ExamResponse {
    questionCode: string
    question: string
    optionLabel: OptionLabel | null
    optionText: null | string
    optionCorrect: boolean
    reasonLabel: OnLabel | null
    reasonText: null | string
    reasonCorrect: boolean
    points: number
    feedback: string
  }

  export enum OptionLabel {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
  }

  export interface UserExamResult {
    id: string
    name: string
    schools: string
  }
}

export {}
