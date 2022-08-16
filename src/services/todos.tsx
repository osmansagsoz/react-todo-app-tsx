import { TodoType } from "../types";
const todosUrl = `${process.env.REACT_APP_TODO_API_BASE_URL}/todos`;

export const createTodo = async ({ title, tagId, time, id, completed, priority }: TodoType) => {
  let unix;

  if (typeof time === "string") {
    const timeParts = time.split(":");
    const date = new Date();
    unix = date.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
  }

  const result = await fetch(todosUrl, {
    body: JSON.stringify({
      id,
      title,
      completed: false,
      tagId: tagId,
      priority,
      time: unix || Date.now() // unix date!!!
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const data = await result.json();
  return data;
};

export const getTodos = async (tagId: number) => {
  const result = await fetch(`${todosUrl}?tagId=${tagId}`);
  const data = await result.json();
  return data;
};

export const deleteTodos = async (todo: TodoType) => {
  const result = await fetch(`${todosUrl}/${todo.id}`, {
    method: "DELETE"
  });
  const data = await result.json();
  return data;
};

export const updateTodo = async (todo: TodoType) => {
  const result = await fetch(`${todosUrl}/${todo.id}`, {
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH"
  });
  const data = await result.json();
  return data;
};
