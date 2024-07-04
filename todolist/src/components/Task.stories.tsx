import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task',
    component: Task
};

const callback = action('addItem')

export const TaskBase = () => {
    return <Task task={{id: '1', title: 'CSS', isDone: false}} todolistId={'todolistId1'}/>
};
