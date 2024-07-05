import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import {v1} from "uuid";
import {Provider} from "react-redux";
import {store} from "../store";

export default {
    title: 'Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
};

export const TaskBase = () => {
    return  <Task task={{id: '1', title: 'CSS', isDone: false}} todolistId={'todolistId1'}/>
};
