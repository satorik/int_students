import React from 'react'
import { CustomError } from '../types/students'

export const ErrorComp: React.FC<{error: CustomError[]}> = ({error}) => {
  console.log(error)
  return (
    <div>
      {error.map((err, idx) => <p key={idx}>{err.message}</p>)}
    </div>
  )
}
