import resourceService from '../../commons/service/resourceService'

const todoResource = resourceService('http://localhost:3003/api/todos/', {
  getTodos: { url: '' },
  createTodo: { url: '', method: 'POST' },
  deleteTodo: { url: ':id', method: 'DELETE' },
})

export default{
    getTodos: todoResource.getTodos,
    createTodo: todoResource.createTodo,
    deleteTodo: todoResource.deleteTodo
}