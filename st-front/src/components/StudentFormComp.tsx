import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStudent, studentEditStop, updateStudent } from '../store/studentActions'
import { EditMode } from '../types/mode'
import { Student, StudentScores } from '../types/students'
import {createStudentForm, StudentForm} from '../utils/handleStudentForm'

export const StudentFormComp:React.FC<{student: Student | null, mode: EditMode}> = ({ student, mode }) => {
  const dispatch = useDispatch()
  const [postForm, setPostForm] = useState<StudentForm>(createStudentForm(student))
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const valid = value.trim() !== ''
    setPostForm({
      ...postForm,
      name: value,
      valid
    })
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostForm({
      ...postForm,
      bithdate: e.target.value
    })
  }

  const handleSelectChange = (e: ChangeEvent<{ value: unknown }>) => {
    setPostForm({
      ...postForm,
      scores: e.target.value as StudentScores
    })
  }

  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (postForm.valid) {
      if (mode === EditMode.Creating) dispatch(createStudent(postForm))
      if (mode === EditMode.Editing) dispatch(updateStudent(postForm))
    }
  }

  return (
    <form autoComplete="off">
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        size="small"
        margin="dense"
        defaultValue={postForm.name}
        fullWidth
        onChange={handleNameChange}
        required
      />
      <TextField
        id="bithdate"
        label="Bithdate"
        variant="outlined"
        size="small"
        margin="normal"
        type="date"
        defaultValue={postForm.bithdate}
        fullWidth
        onChange={handleDateChange}
      />
      <FormControl variant="outlined" fullWidth  size="small">
        <InputLabel>Student Scores</InputLabel>
        <Select
          id="scores"
          value={postForm.scores}
          label="Student Scores"
          onChange={handleSelectChange}
          > {Object.keys(StudentScores).map(score => <MenuItem key={score} value={score}>{score}</MenuItem>)}
        </Select>
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant="contained" color="secondary" onClick={() => dispatch(studentEditStop())}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit" onClick={handleSave}>
          Save
        </Button>
      </div>
    </form>
  )
}
