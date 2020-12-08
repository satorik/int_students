export enum StudentScores {
  Unsatisfactory = 'Unsatisfactory',
  Satisfactory = 'Satisfactory',
  Good = 'Good',
  Exellent = 'Exellent',
}

export interface Student {
  id: string
  name: string
  bithdate: Date
  scores: StudentScores
}

export interface CustomError {
  message: string
}
