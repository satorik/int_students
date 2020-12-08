import { CustomError } from '../types/students'

export const formatError = (error: any): CustomError[] => {
  if (error.response) {
    return error.response.data.errors
  } else if (error.request) {
    console.log(error.request)
    return [{ message: 'Request error' }]
  } else {
    return [{ message: 'Unknown Error' }]
  }
}
