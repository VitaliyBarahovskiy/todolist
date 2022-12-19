import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {log} from "util";
import {Button} from "./Button/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputValue: string) => void
}

export function Todolist(props: PropsType) {
    let [inputValue, setInputValue] = useState('')


    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTaskHandler = (tId:string) => {
        props.removeTask(tId)
    }
    const tsarChangeFilter = (value:FilterValuesType) => {
        props.changeFilter(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputValue} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button name={'+'} starter={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        // const removeTaskHandler = () => {
                        //     props.removeTask(t.id)
                        // }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                {/*<button onClick={()=>removeTaskHandler(t.id)}>x</button>*/}
                                <Button name={'X'} starter={()=>removeTaskHandler(t.id)}/>
                                {/*<button onClick={() => {props.removeTask(t.id)}}>x</button>*/}
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <Button name={'All'} starter={()=>tsarChangeFilter('all')}/>
            <Button name={'Active'} starter={()=>tsarChangeFilter('active')}/>
            <Button name={'Completed'} starter={()=>tsarChangeFilter('completed')}/>

            {/*<button onClick={()=>tsarChangeFilter('completed')}>Completed</button>*/}
            {/*<button onClick={changeFilterCompleted}>Completed</button>*/}
            {/*<button onClick={() => {props.changeFilter("completed")}}>Completed</button>*/}
        </div>
    </div>
}
