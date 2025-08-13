import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import { useTodoStore } from './stores/todo'
import todoService from './services/todo/todoService'

export default function App() {
  const [todo, setTodo] = useState('')
  const { addTodo, setTodos } = useTodoStore()
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function getTodos() {
    try {
      setLoading(true);
      setError(null);

      const todoRes = await todoService.getTodos()
      setTodos(todoRes)
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <p style={{
    width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center'
  }}>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='App'>
      <div>
        <input type="text" onChange={e => setTodo(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(todo)
          }
        }} />
        <button onClick={() => addTodo(todo)}>Criar</button>
      </div>
      <TaskList />
    </div>
  )
}
