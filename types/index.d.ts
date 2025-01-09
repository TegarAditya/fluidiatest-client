declare global {
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
}

export {}
