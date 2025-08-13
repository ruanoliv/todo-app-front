import { create } from "zustand";
import todoService from "../services/todo/todoService";

interface Todo {
    _id: string | null,
    description: string,
    done: boolean
}

interface TodoStore {
    todos: Todo[]
    addTodo: (description: string) => void,
    removeTodo: (id: string | null) => void
    setTodos: (todosDB: []) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],

    addTodo: async (description) => {
        const newTodo = await todoService.save({ description })
        set((state) => ({
            todos: [...state.todos, newTodo]
        }))
    },

    removeTodo: (id) => {
        set((state) => ({
            todos: id !== null ? [...state.todos.filter(todo => todo._id !== id)] : [...state.todos]
        }))
        todoService.deleteTodo({id})
    },

    setTodos: (todosDB) => set(() => ({
        todos: todosDB
    }))

}));