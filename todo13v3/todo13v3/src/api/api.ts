import axios, {AxiosRequestConfig} from "axios";

export const config: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        'API-KEY': '0d6fcc4b-d0b8-4c34-b068-91acef8dc727'
    }
}

export const todolistApi = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', config)
    },
    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, config)
    },
    deleteTodolist(todolistId: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, config)
    },
    updateTodolist(todolistId: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'DDDDDd'}, config)
    },

}