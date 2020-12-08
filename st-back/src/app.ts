import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
import { createStudentRouter } from './routes/new'
import { indexStudentRouter } from './routes'
import { updateStudentRouter } from './routes/update'
import { deleteStudentRouter } from './routes/delete'

const app = express()
app.use(cors())
app.use(json())

app.use(createStudentRouter)
app.use(indexStudentRouter)
app.use(updateStudentRouter)
app.use(deleteStudentRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
