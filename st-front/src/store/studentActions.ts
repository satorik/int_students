import { ActionType } from '../types/actionType'
import { Student, CustomError } from '../types/students'
import axios from './axios-students'
import { AppThunk } from '.'
import { StudentForm } from '../utils/handleStudentForm'
import { formatError } from '../utils/errorHandle'

class FetchStudentStart {
  readonly type = ActionType.FETCH_STUDENTS_START
}

class FetchStudentSuccess {
  readonly type = ActionType.FETCH_STUDENTS_SUCCESS
  constructor(public payload: Student[]) {}
}

class FetchStudentFail {
  readonly type = ActionType.FETCH_STUDENTS_FAIL
  constructor(public payload: CustomError[]) {}
}

class StudentCreateInit {
  readonly type = ActionType.STUDENT_CREATE_INIT
}

class StudentCreateStart {
  readonly type = ActionType.STUDENT_CREATE_START
}

class StudentCreateSuccess {
  readonly type = ActionType.STUDENT_CREATE_SUCCESS
  constructor(public payload: Student) {}
}

class StudentCreateFail {
  readonly type = ActionType.STUDENT_CREATE_FAIL
  constructor(public payload: CustomError[]) {}
}

class StudentUpdateInit {
  readonly type = ActionType.STUDENT_UPDATE_INIT
  constructor(public payload: Student) {}
}

class StudentUpdateStart {
  readonly type = ActionType.STUDENT_UPDATE_START
}

class StudentUpdateSuccess {
  readonly type = ActionType.STUDENT_UPDATE_SUCCESS
  constructor(public payload: Student) {}
}

class StudentUpdateFail {
  readonly type = ActionType.STUDENT_UPDATE_FAIL
  constructor(public payload: CustomError[]) {}
}

class StudentDeleteStart {
  readonly type = ActionType.STUDENT_DELETE_START
}

class StudentDeleteSuccess {
  readonly type = ActionType.STUDENT_DELETE_SUCCESS
  constructor(public payload: string) {}
}

class StudentDeleteFail {
  readonly type = ActionType.STUDENT_DELETE_FAIL
  constructor(public payload: CustomError[]) {}
}

class StudentEditStop {
  readonly type = ActionType.STUDENT_EDIT_STOP
}

export type Actions =
  | FetchStudentStart
  | FetchStudentSuccess
  | FetchStudentFail
  | StudentCreateInit
  | StudentUpdateInit
  | StudentDeleteStart
  | StudentEditStop
  | StudentCreateSuccess
  | StudentCreateFail
  | StudentUpdateSuccess
  | StudentUpdateFail
  | StudentDeleteSuccess
  | StudentDeleteFail
  | StudentCreateStart
  | StudentUpdateStart

export const studentEditStop = (): StudentEditStop => {
  return {
    type: ActionType.STUDENT_EDIT_STOP,
  }
}

export const studentCreateInit = (): StudentCreateInit => {
  return {
    type: ActionType.STUDENT_CREATE_INIT,
  }
}

const studentCreateStart = (): StudentCreateStart => {
  return {
    type: ActionType.STUDENT_CREATE_START,
  }
}

const studentCreateSuccess = (student: Student): StudentCreateSuccess => {
  return {
    type: ActionType.STUDENT_CREATE_SUCCESS,
    payload: student,
  }
}

const studentCreateFail = (errors: CustomError[]): StudentCreateFail => {
  return {
    type: ActionType.STUDENT_CREATE_FAIL,
    payload: errors,
  }
}

export const studentUpdateInit = (student: Student): StudentUpdateInit => {
  return {
    type: ActionType.STUDENT_UPDATE_INIT,
    payload: student,
  }
}

const studentUpdateStart = (): StudentUpdateStart => {
  return {
    type: ActionType.STUDENT_UPDATE_START,
  }
}

const studentUpdateSuccess = (student: Student): StudentUpdateSuccess => {
  return {
    type: ActionType.STUDENT_UPDATE_SUCCESS,
    payload: student,
  }
}

const studentUpdateFail = (errors: CustomError[]): StudentUpdateFail => {
  return {
    type: ActionType.STUDENT_UPDATE_FAIL,
    payload: errors,
  }
}

const studentDeleteStart = (): StudentDeleteStart => {
  return {
    type: ActionType.STUDENT_DELETE_START,
  }
}

const studentDeleteSuccess = (studentId: string): StudentDeleteSuccess => {
  return {
    type: ActionType.STUDENT_DELETE_SUCCESS,
    payload: studentId,
  }
}

const studentDeleteFail = (errors: CustomError[]): StudentDeleteFail => {
  return {
    type: ActionType.STUDENT_DELETE_FAIL,
    payload: errors,
  }
}

const fetchStudentsSuccess = (students: Student[]): FetchStudentSuccess => {
  return {
    type: ActionType.FETCH_STUDENTS_SUCCESS,
    payload: students,
  }
}

const fetchStudentsFail = (errors: CustomError[]): FetchStudentFail => {
  return {
    type: ActionType.FETCH_STUDENTS_FAIL,
    payload: errors,
  }
}

const fetchStudentsStart = (): FetchStudentStart => {
  return {
    type: ActionType.FETCH_STUDENTS_START,
  }
}

export const fetchStudents = (): AppThunk => async (dispatch) => {
  dispatch(fetchStudentsStart())
  axios
    .get('/students')
    .then((res) => {
      dispatch(fetchStudentsSuccess(res.data))
    })
    .catch((error) => {
      const formatedErrors = formatError(error)
      dispatch(fetchStudentsFail(formatedErrors))
    })
}

export const deleteStudent = (id: string): AppThunk => async (dispatch) => {
  dispatch(studentDeleteStart())
  axios
    .delete(`/student/${id}`)
    .then((res) => {
      console.log(res)
      dispatch(studentDeleteSuccess(id))
    })
    .catch((error) => {
      const formatedErrors = formatError(error)
      dispatch(studentDeleteFail(formatedErrors))
    })
}

export const createStudent = (studentData: StudentForm): AppThunk => async (dispatch) => {
  dispatch(studentCreateStart())
  axios
    .post('/students/', {
      name: studentData.name,
      bithdate: studentData.bithdate,
      scores: studentData.scores,
    })
    .then((res) => {
      dispatch(studentCreateSuccess(res.data))
      dispatch(studentEditStop())
    })
    .catch((error) => {
      const formatedErrors = formatError(error)
      dispatch(studentCreateFail(formatedErrors))
      dispatch(studentEditStop())
    })
}

export const updateStudent = (studentData: StudentForm): AppThunk => async (dispatch) => {
  dispatch(studentUpdateStart())
  axios
    .put(`/student/${studentData.id}`, {
      name: studentData.name,
      bithdate: studentData.bithdate,
      scores: studentData.scores,
    })
    .then((res) => {
      dispatch(studentUpdateSuccess(res.data))
      dispatch(studentEditStop())
    })
    .catch((error) => {
      const formatedErrors = formatError(error)
      dispatch(studentUpdateFail(formatedErrors))
      dispatch(studentEditStop())
    })
}
