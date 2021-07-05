import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';

export default class Loading extends Component {
    render() {
        return (
            <div style={{color:'white'}}>
            <Spinner animation="border" className="center" />
            <span >Loading...</span>
            </div>

        )
    }
}
