import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemForm',
    component: AddItemForm
};

const callback = action('addItem')

export const AddItemFormBase = () => {
    return <AddItemForm addItem={callback}/>
};
