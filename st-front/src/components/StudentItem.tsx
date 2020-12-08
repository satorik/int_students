import React from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Student, StudentScores } from '../types/students'
import { useDispatch } from 'react-redux'
import { deleteStudent, studentUpdateInit } from '../store/studentActions'

export const StudentItem: React.FC<{student: Student}> = ({ student }) => {
  const dispatch = useDispatch()
  const scores = Object.entries(StudentScores).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: +e[0] }))
  return (
    <div style={{ cursor: 'pointer' }}>
      <div style={{ textAlign: 'right' }}>
        <IconButton onClick={() => dispatch(studentUpdateInit(student))}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => dispatch(deleteStudent(student.id))}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <div>
        <Typography variant="h4" color="primary" paragraph>
          {student.name}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightBold">{new Date(student.bithdate).toLocaleDateString('en-CA')}</Box>
          <Box fontStyle="italic" style={{ color: 'grey' }}>
            {student.scores}
          </Box>
        </Typography>
      </div>
    </div>
  )
}
