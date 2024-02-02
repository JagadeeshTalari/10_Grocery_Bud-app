import { nanoid } from "nanoid";
import { useState } from "react";

const storedItems = localStorage.getItem('tasks')

const App = () => {
  const [items, setItems] = useState(JSON.parse(storedItems) || [])
  const [item, setItem] = useState("")
  // const [taskStatus, setTaskStatus] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      name: item,
      id: nanoid(),
      completed: false
    }
    const allItems = [...items, newItem]
    setItems(allItems)
    localStorage.setItem('tasks', JSON.stringify(allItems))
    setItem("")
  }

  const removeItem = (taskId) => {
    const updatedItems = items.filter(item => {
      return (
        item.id !== taskId
      )
    })
    localStorage.setItem('tasks', JSON.stringify(updatedItems))
    setItems(updatedItems)
  }

  const editTask = (taskId) => {
    const editedTasks = items.map(item => {
      if(item.id === taskId){
        return {...item, completed: !item.completed}
      }
      return item
    })
    setItems(editedTasks)
    localStorage.setItem('tasks', JSON.stringify(editedTasks))
  }

  return <main>
    <section className="section-center">
    <form action="" onSubmit={handleSubmit}>
      <h4>Grocery Bud - Starter</h4>
      <div className="form-control">
        <input type="text" value={item} className="form-input"  onChange={(e) => setItem(e.target.value)}/>
        <button  className="btn">Add Task</button>
        </div>
    </form>
    <div className="items">
      {
        items.map(task => {
          return (
            <article key={nanoid()} className="single-item">
              <input type="checkbox" checked={task.completed} onChange={() => {
                editTask(task.id)
              }}/>
              <p style={{
                textDecoration: task.completed &&"line-through"
              }}>{task.name}</p>
              <button className="btn remove-btn" onClick={() => {
                removeItem(task.id)
              }}>Delete</button>
            </article>
          )
        })
}
    </div>
    </section>
  </main>;
};

export default App;
