import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        const year = new Date().getFullYear()
        return (
            <div>
                <footer className="footer container-fluid ">
                    <h6>TodoList &#169; {year} </h6>
                </footer>
            </div>
        )
    }
}

export default Footer
