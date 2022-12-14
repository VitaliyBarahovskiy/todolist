import React from "react";
import {TypeFilter} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    taskFilter: (value: TypeFilter) => void
}




export  const Todolist = (props:PropsType) => {
    return  <div className="App">
                <div>
                    <h3>{props.title}</h3>

                    <div>
                        <input/>
                        <button>+</button>
                    </div>
                    <ul>
                        {props.tasks.map((el) => {
                            return (
                                <li key={el.id}>
                                    <button onClick={()=>{props.removeTask(el.id)}}>x</button>
                                    <input type="checkbox" checked={el.isDone}/>
                                    <span>{el.title}</span>

                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        <button onClick={()=>{props.taskFilter("ALL")}}>All</button>
                        <button onClick={()=>{props.taskFilter("Active")}}>Active</button>
                        <button onClick={()=>{props.taskFilter("Completed")}}>Completed</button>
                    </div>
                </div>
            </div>

}

export default Todolist;
