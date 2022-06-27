import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <div>
            <Spinner animation="border" role="status" style={{height: '80px', width: '80px'}}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading