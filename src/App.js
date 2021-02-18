import React, { Component } from 'react'
import './App.css'
import CreateTask from './components/CreateTask'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/Footer';



export class App extends Component {


    render() {
        return (
            <div>
                <header className="header">
                   <h1 className="container" >- Todo List - <span><h3>In React</h3></span> </h1> 
                </header>
                <CreateTask/>
                <Footer/>
            </div>
        )
    }
}
console.log(Date().month)

export default App

