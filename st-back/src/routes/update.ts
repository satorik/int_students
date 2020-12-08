import express, { Request, Response } from 'express'
import { NotFoundError } from '../errors/not-found-error'
import { validateRequest } from '../middlewares/validate-request'
import { body } from 'express-validator'
import { Student } from '../models/student'

const router = express.Router()

router.put(
  '/api/student/:id',
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('bithdate').not().isEmpty().isDate().withMessage('bithdate must be a valid date'),
    body('scores').not().isEmpty().withMessage('must noe bw empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const student = await Student.findById(req.params.id)

    if (!student) throw new NotFoundError()

    student.set({
      name: req.body.name,
      bithdate: req.body.bithdate,
      scores: req.body.scores,
    })

    await student.save()

    res.send(student)
  }
)

export { router as updateStudentRouter }
