import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title={'November'}/>
            <Todolist title={'December'}/>

        </div>

    );
}

export default App;
