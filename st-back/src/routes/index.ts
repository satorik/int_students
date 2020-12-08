import express, { Request, Response } from 'express'
import { Student } from '../models/student'

const router = express.Router()

router.get('/api/students', async (req: Request, res: Response) => {
  const students = await Student.find({})

  res.send(students)
})

export { router as indexStudentRouter }
