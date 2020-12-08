import express, { Request, Response } from 'express'
import { validateRequest } from '../middlewares/validate-request'
import { body } from 'express-validator'
import { Student } from '../models/student'

const router = express.Router()

router.post(
  '/api/students',
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('bithdate').not().isEmpty().isDate().withMessage('bithdate must be a valid date'),
    body('scores').not().isEmpty().withMessage('should not be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, bithdate, scores } = req.body

    const student = Student.build({
      name,
      bithdate,
      scores,
    })

    await student.save()

    res.status(201).send(student)
  }
)

export { router as createStudentRouter }
