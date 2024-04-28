import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditedTodo(e.target.value);
  };

  const handleEditDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask = {
      id: Date.now(),
      name: newTodo,
      description: newDescription,
      status: "not completed",
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
    setNewDescription("");
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditId(id);
    setEditedTodo(todoToEdit.name);
    setEditedDescription(todoToEdit.description);
  };

  const handleSaveEditTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return {
          ...todo,
          name: editedTodo,
          description: editedDescription,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditId(null);
    setEditedTodo("");
    setEditedDescription("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatusChange = (id, status) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: status,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "all") return true;
    return todo.status === statusFilter;
  });

  return (
    <>
      <div className="form-control">
        <h1>React Todo Task</h1>
        <div className="col-md-12">
          <input
            type="text"
            className=""
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter Task Name.."
          />
          <input
            type="text"
            className=""
            value={newDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter Description.."
          />
          <button className="btn btn-success" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
        <div>
          <label>Filter by Status: </label>
          <select
            className="p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "5px",
            }}
          >
            {editId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={handleEditInputChange}
                  placeholder="Enter Todo Name"
                />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={handleEditDescriptionChange}
                  placeholder="Enter Todo Description"
                />
                <button onClick={handleSaveEditTodo}>Save</button>
              </div>
            ) : (
              <div className="data">
                <h3>ToDo Title : {todo.name}</h3>
                <p> ToDo Description : {todo.description}</p>
                <p>Status: {todo.status}</p>
                <button
                  className="btn btn-success databtn"
                  onClick={() =>
                    handleStatusChange(
                      todo.id,
                      todo.status === "completed"
                        ? "not completed"
                        : "completed"
                    )
                  }
                >
                  {todo.status === "completed"
                    ? "Mark as Not Completed"
                    : "Mark as Completed"}
                </button>
                <button
                  className="btn btn-success databtn"
                  onClick={() => handleEditTodo(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-success databtn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
