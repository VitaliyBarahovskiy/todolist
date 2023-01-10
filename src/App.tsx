import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from "uuid";

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete
// CRUD

// Interface

export type FilterValuesType = "all" | "active" | "completed"

type TasklistsType = {
    data: TaskType[],
    filter: FilterValuesType
}

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

type TaskStateType = {
    [todoListId: string]: TasklistsType
}

class AddItemForm extends React.Component<{ addItem: any }> {
    render() {
        return null;
    }
}

function App() {
    const todolist_1: string = v1()
    const todolist_2: string = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolist_1, title: 'What to learn', filter: 'all'},
        {id: todolist_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolist_1]: {
            data: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "ES6 & TS", isDone: true},
                {id: v1(), title: "REACT", isDone: false}
            ],
            filter: 'all'
        },
        [todolist_2]: {
            data: [
                {id: v1(), title: "Water", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Juice", isDone: false}
            ],
            filter: 'all'
        }
    })

    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        setTasks({
            ...tasks,
            [todoListId]: {...tasks[todoListId], data: tasks[todoListId].data.filter(t => t.id !== taskId)}
        })
    }


    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }


        setTasks({...tasks, [todoListId]: {...tasks[todoListId], data: [...tasks[todoListId].data, newTask]}})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
            }
        })

    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(t => t.id === taskId ? {...t, title: title} : t)
            }
        })

    }


    const changeTodoListFilter = (value: FilterValuesType, todolistId: string) => {
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
        setTasks({...tasks,[todolistId]:{...tasks[todolistId], filter:value}})

    }

    const changeTodoListTitle = (title:string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))

    }

    const removeTodolist = (todoListId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist : TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: {data:[], filter: "all"}})
    }



    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    const todoListsItems = todolists.map(tl => {
        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id].data, tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={filteredTasksForRender}

                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodolist}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListFilter={changeTodoListFilter}
                changeTodolistTitle={changeTodoListTitle}
            />
        )
    })


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todoListsItems}
        </div>
    );
}

export default App;
