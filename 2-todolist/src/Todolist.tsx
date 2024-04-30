import {filterValuesType, TaskType} from './App';
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (id: number) => void
	changeFilterStatus: (value: filterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilterStatus}: PropsType) => {

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button title={'+'}/>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {
							return <li key={task.id}>
								<input type="checkbox" checked={task.isDone}/>
								<span>{task.title}</span>
								<Button title={'x'} onClick={() => removeTask(task.id)}/>{/*Передадим функцию removeTask внутрь компоненты Todolist так же как и данные через props и вызовем её*/}
							</li>
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClick={() => changeFilterStatus('all')}/>
				<Button title={'Active'}  onClick={() => changeFilterStatus('active')}/>
				<Button title={'Completed'}  onClick={() => changeFilterStatus('completed')}/>
			</div>
		</div>
	)
}
