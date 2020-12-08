import { Student, CustomError } from '../types/students'
import { EditMode } from '../types/mode'
import { ActionType } from '../types/actionType'
import { Actions } from './studentActions'

export interface StoreState {
  students: Student[]
  currentStudent: Student | null
  mode: EditMode
  loading: boolean
  error: null | CustomError[]
}

const initialState: StoreState = {
  students: [],
  currentStudent: null,
  mode: EditMode.Stable,
  loading: false,
  error: null,
}

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.STUDENT_EDIT_STOP: {
      return {
        ...state,
        mode: EditMode.Stable,
        currentStudent: null,
      }
    }
    case ActionType.STUDENT_CREATE_INIT: {
      return {
        ...state,
        mode: EditMode.Creating,
      }
    }
    case ActionType.STUDENT_UPDATE_INIT: {
      return {
        ...state,
        mode: EditMode.Editing,
        currentStudent: action.payload,
      }
    }
    case ActionType.STUDENT_UPDATE_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.STUDENT_CREATE_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.STUDENT_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        students: [...state.students, action.payload],
      }
    }
    case ActionType.STUDENT_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      }
    }
    case ActionType.STUDENT_DELETE_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case ActionType.STUDENT_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        students: state.students.filter((student) => student.id !== action.payload),
      }
    }
    case ActionType.STUDENT_DELETE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case ActionType.STUDENT_UPDATE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case ActionType.STUDENT_CREATE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case ActionType.FETCH_STUDENTS_START:
      return {
        ...state,
        loading: true,
      }
    case ActionType.FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
      }
    case ActionType.FETCH_STUDENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer
