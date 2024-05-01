import {filterValuesType, TaskType} from './App';
import {Button} from './Button';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilterStatus: (value: filterValuesType) => void
    addTask: (value: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilterStatus, addTask}: PropsType) => {

    const [value, setValue] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const onClickHandler = () => {
        addTask(value)
        setValue('')
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={value}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyUpHandler}/>
                <Button title={'+'}
                        onClick={onClickHandler}
                />
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {
                            const onRemoveTask = () => removeTask(task.id)
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'}
                                            onClick={onRemoveTask}/>{/*Передадим функцию removeTask внутрь компоненты Todolist так же как и данные через props и вызовем её*/}
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilterStatus('all')}/>
                <Button title={'Active'} onClick={() => changeFilterStatus('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterStatus('completed')}/>
            </div>
        </div>
    )
}
