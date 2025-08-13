import { useTodoStore } from "../../stores/todo"
import './index.css'

export default function TaskList() {
    const { todos, removeTodo } = useTodoStore()

    todos.map((todo) => console.log(todo._id))

    return (
        <ul>
            {
                todos.map((todo) => 
                    todo._id !== undefined ? (
                        <div className="Card" key={todo._id}>
                            <li>{todo.description}</li>
                            <button onClick={() => removeTodo(todo._id)}>Apagar</button>
                        </div>
                    ) : null
                )
            }
        </ul>
    )


}