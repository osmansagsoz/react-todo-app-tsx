import css from "./todoListArea.module.css";
import Todo from "./todo";
import { useCallback } from "react";

const TodoListArea = ({ todos, onTodoChange, onTodoDelete, selectedTag, onListDelete }) => {
  const onDeleteListClick = useCallback(async () => {
    onListDelete(selectedTag);
  }, [onListDelete, selectedTag]);

  const onClearCompletedClick = useCallback(async () => {
    todos.map(todo => (todo.completed === true ? onTodoDelete(todo) : null))
  }, [onTodoDelete, todos])

  return (
    <section className={css.todoListArea}>
       <div className={css.todoList}>
      <h2 className={css.todoListTitle}>{selectedTag.name}</h2>
      <div className={css.todoListBody}>
        {todos ? (
          <ul className={css.todos}>
            {todos.map((todo) => {
              return <Todo key={todo.id} todo={todo} onTodoChange={onTodoChange} />;
            })}
          </ul>
        ) : null}
      </div>
      <div className={css.deleteArea}>
        <button className={css.clearCompleted} aria-label="Clear completed todos" onClick={onClearCompletedClick} >
          Clear completed todos
        </button>
        <button className={css.deleteList} aria-label="Delete list" onClick={onDeleteListClick}>
          Delete list
        </button>
      </div>
    </div>
    </section>
  );
};

export default TodoListArea;
