import css from "./todoListArea.module.css";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faFireFlameCurved, faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useMemo, useState, useRef } from "react";

const Todo = ({ todo, onTodoChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isTimeEditing, setIsTimeEditing] = useState(false);
  const [isPriEditing, setIsPriEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ editFormTitle: "" });
  //   const timeInputRef = useRef(null);

  const priColor = useMemo(() => {
    switch (todo.priority) {
      case "Priority 1":
        return "var(--darkrose)";
      case "Priority 2":
        return "var(--darkpeach)";
      case "Priority 3":
        return "var(--darkblue)";
      default:
        return undefined;
    }
  }, [todo.priority]);

  const displayTime = useMemo(() => {
    if (!todo.time) {
      return;
    }
    if (typeof todo.time === "string") {
      return todo.time;
    } else {
      const date = new Date(todo.time);
      return `${date.getHours()}:${date.getMinutes()}`;
    }
  }, [todo.time]);

  const handleCompletedChange = useCallback(
    (e) => {
      onTodoChange({ ...todo, completed: e.target.checked });
    },
    [onTodoChange, todo]
  );

  const showForEditing = useCallback((e) => {
    if (e.target.name === "editFormTitle") {
      setIsEditing(true);
    }
    // ASK Rodrigo!
    if (e.target.name === "timeSpan") {
      setIsTimeEditing(true);
      // timeInputRef.current.focus();
    }
    if (e.currentTarget.name === "priSpan") {
      setIsPriEditing(true);
    }
  }, []);

  const onFinishedEditing = useCallback((e) => {
    setIsEditing(false);
    setIsTimeEditing(false);
    setIsPriEditing(false);
  }, []);

  const handleEditedTitleChange = useCallback((e) => {
    setEditFormData({
      [e.target.name]: e.target.value
    });
  }, []);

  const onEditedTitleSubmit = useCallback(
    (e) => {
      onTodoChange({ ...todo, title: editFormData.editFormTitle });
      setIsEditing(false);
      setEditFormData({ editFormTitle: "" });
    },
    [editFormData.editFormTitle, onTodoChange, todo]
  );

  const handleEditedTimeChange = useCallback(
    (e) => {
      const re = /^[0-9:\b]+$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        onTodoChange({ ...todo, time: e.target.value });
      }
    },
    [onTodoChange, todo]
  );

  const onTimeEnterPress = useCallback((e) => {
    if (e.keyCode === 13) {
      setIsTimeEditing(false);
    }
  }, []);

  const handlePriChange = useCallback(
    (e) => {
      onTodoChange({ ...todo, priority: e.target.value });
    },
    [onTodoChange, todo]
  );

  return (
    <li>
      <input
        type="checkbox"
        name="completed"
        checked={todo.completed}
        onChange={handleCompletedChange}
      />
      <span className={css.customCheckbox}></span>
      <label>
        <span className={css.todoSpan}>{todo.title}</span>
        <form
          className={cx(css.editForm, isEditing && css.showEditElement)}
          onClick={showForEditing}
          onBlur={onFinishedEditing}
          onSubmit={onEditedTitleSubmit}
        >
          <input
            type="text"
            className={css.editInput}
            name="editFormTitle"
            value={editFormData.editFormTitle}
            onChange={handleEditedTitleChange}
          />
        </form>
      </label>
      <div className={css.extraWrapper}>
        <button className={css.priSpan} name="priSpan" onClick={showForEditing}>
          {todo.priority && (
            <FontAwesomeIcon
              icon={
                todo.priority === "Priority 1"
                  ? faFire
                  : todo.priority === "Priority 2"
                  ? faFireFlameCurved
                  : faFireFlameSimple
              }
              style={{ color: priColor }}
              className={css.priIcon}
            />
          )}
          {isPriEditing ? (
            <select className={css.priSelect} onChange={handlePriChange} onBlur={onFinishedEditing}>
              <option value="Priority 1">1</option>
              <option value="Priority 2">2</option>
              <option value="Priority 3">3</option>
            </select>
          ) : null}
        </button>
        <button className={css.timeSpan} name="timeSpan" onClick={showForEditing}>
          {displayTime}
          {isTimeEditing ? (
            <input
              className={css.editedTime}
              type="text"
              name="editedTime"
              onBlur={onFinishedEditing}
              onChange={handleEditedTimeChange}
              onKeyDown={onTimeEnterPress}
            />
          ) : null}
        </button>
      </div>
    </li>
  );
};

export default Todo;
