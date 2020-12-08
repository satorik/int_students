import { Student, StudentScores } from '../types/students'

export interface StudentForm {
  id: string | null
  name: string
  bithdate: string
  scores: StudentScores
  valid: boolean
}

export const createStudentForm = (student: Student | null): StudentForm => {
  return {
    id: student ? student.id : null,
    name: student ? student.name : '',
    bithdate: student ? new Date(student.bithdate).toLocaleDateString('en-CA') : '2000-08-15',
    scores: student ? student.scores : StudentScores.Good,
    valid: !!student,
  }
}
