import React from 'react';
import './App.css';
import Todolist from "./Todolist";


function App() {

    const title1 = 'November'
    const title2 = 'December'

    const task1 = [
        {id:1, title: "HTML", isDone:true},
        {id:2, title: "JS", isDone:true},
        {id:3, title: "React", isDone:false},
    ]


    const task2 = [
        {id:1, title: "Hello world", isDone:true},
        {id:2, title: "I am Happy", isDone:false},
        {id:3, title: "Yo", isDone:false},
    ]


    return (
        <div className="App">
            <Todolist title={title1} tasks={task1} />
            <Todolist title={title2} tasks={task2} />

        </div>

    );
}

export default App;
