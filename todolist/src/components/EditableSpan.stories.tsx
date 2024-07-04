import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan',
    component: AddItemForm
};

const callback = action('value changed')

export const EditableSpanBase = () => {
    return <EditableSpan title={'start value'} onChange={callback}/>
};
