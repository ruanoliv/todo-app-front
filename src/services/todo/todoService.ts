import todoResource from "./todoResource"

interface Todo {
    _id: string | null,
    description: string,
    done: boolean
}

const getTodos = async () => {
    try {
        return await todoResource.getTodos({})
    } catch (err) {
        return null
    }
}

const save = async ({ description }: { description: string }): Promise<Todo> => {
    const todo = {
        description: description
    }

    return todoResource.createTodo({}, todo)
}

const deleteTodo = async ({ id }: { id: string | null}): Promise<void> => {
    if (id !== null){
        todoResource.deleteTodo({id}, {})
    }
}


export default {
    getTodos,
    save,
    deleteTodo
}