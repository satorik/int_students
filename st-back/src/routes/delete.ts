import express, { Request, Response } from 'express'
import { NotFoundError } from '../errors/not-found-error'
import { Student } from '../models/student'

const router = express.Router()

router.delete('/api/student/:id', async (req: Request, res: Response) => {
  const student = await Student.findById(req.params.id)
  if (!student) throw new NotFoundError()

  await Student.findByIdAndDelete(req.params.id)

  res.send(req.params.id)
})

export { router as deleteStudentRouter }
