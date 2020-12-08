import mongoose from 'mongoose'

enum StudentScores {
  Unsatisfactory = 'Unsatisfactory',
  Satisfactory = 'Satisfactory',
  Good = 'Good',
  Exellent = 'Exellent',
}

interface StudentProps {
  name: string
  bithdate: Date
  scores: StudentScores
}

interface StudentDoc extends mongoose.Document {
  name: string
  bithdate: Date
  scores: StudentScores
}

interface StudentModel extends mongoose.Model<StudentDoc> {
  build(props: StudentProps): StudentDoc
}

const studentSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    bithdate: {
      required: true,
      type: Date,
    },
    scores: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

studentSchema.statics.build = (props: StudentProps) => {
  return new Student(props)
}

const Student = mongoose.model<StudentDoc, StudentModel>('Student', studentSchema)

export { Student }
