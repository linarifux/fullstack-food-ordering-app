import React from 'react'
import { Alert } from 'react-bootstrap'

const Error = ({message, type}) => {
  return (
    <div>
    <Alert variant={type}>
        {message}
    </Alert>
    </div>
  )
}

export default Error