import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Grid, Card, CardContent } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { StudentItem } from './StudentItem'
import { StudentFormComp } from './StudentFormComp'
import {StoreState} from '../store/studentReducer'
import { fetchStudents, studentCreateInit } from '../store/studentActions'
import { EditMode } from '../types/mode'
import { ErrorComp } from './ErrorComp'
import { RootState } from '../store'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '250px',
  },
  paper: {
    height: '100%',
  },
  create: {
    textAlign: 'center',
  },
}))

const StyledItem = ({ children } : {children : React.ReactNode}) => {
  const classes = useStyles()

  return (
    <Grid item xl={3} lg={3} md={6} sm={12} xs={12} className={classes.root}>
      <Card className={classes.paper}>
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  )
}

const StudentsList: React.FC = () => {
  const studentsState: StoreState = useSelector((state: RootState) => state.students)
  const {students, currentStudent, mode, loading, error} = studentsState

  // const students: Student[] = useSelector(({students} : {students: StoreState}) => students.students)
  // const currentStudent: Student | null = useSelector(({students} : {students: StoreState}) => students.currentStudent)
  // const mode: EditMode = useSelector(({students} : {students: StoreState}) => students.mode)
  // const loading: boolean = useSelector(({students} : {students: StoreState}) => students.loading)
  // const error: any = useSelector(({students} : {students: StoreState}) => students.error)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(fetchStudents());
  }, [])

  const classes = useStyles()
  const createElement = (
    <div className={classes.create}>
      <IconButton size="medium" onClick={() => dispatch(studentCreateInit())}>
        <AddCircleOutlineIcon style={{ fontSize: '5rem' }} />
      </IconButton>
    </div>
  )
  console.log(error)

  if (error) return <ErrorComp error={error} />
  if (loading) return <p>Loading...</p>
  return (
    <>
      <Grid container spacing={2}>
        {students.map((student) => (
          <StyledItem key={student.id}>
            {currentStudent?.id === student.id ? (
              <StudentFormComp student={currentStudent} mode={mode} />
            ) : (
              <StudentItem student={student} />
            )}
          </StyledItem>
        ))}
        <StyledItem>{mode === EditMode.Creating ? <StudentFormComp student={currentStudent} mode={mode}/> : createElement}</StyledItem>
      </Grid>
    </>
  )
}

 export default StudentsList
