import { Api } from "../api/ApiConfig"

interface Todo {
    _id: string | null,
    description: string,
    done: boolean
}

const getTodos = async () => {
    try {
        const { data } = await Api().get(`/`, {})
        return data
    } catch (err) {
        return null
    }
}

const save = async ({ description }: { description: string }): Promise<Todo> => {
    const todo = {
        description: description
    }

    const {data} = await Api().post('/', todo, {})

    const result = {
      _id: data._id,
      description: data.description,
      done: data.done
    }

    return result
}

const deleteTodo = async ({ id }: { id: string | null }): Promise<void> => {
    if (id !== null) {
        await Api().delete(`/${id}`,{})
    }
}

export default {
    getTodos,
    save,
    deleteTodo
}