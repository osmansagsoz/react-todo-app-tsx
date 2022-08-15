const todosUrl = `${process.env.REACT_APP_TODO_API_BASE_URL}/todos`;

export const createTodo = async ({ title, tagId, time, id, completed, priority }) => {
  const result = await fetch(todosUrl, {
    body: JSON.stringify({
      id,
      title,
      completed: false,
      tagId,
      priority,
      time: time || Date.now() // unix date!!!
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const data = await result.json();
  return data;
};

export const getTodos = async (tagId) => {
  const result = await fetch(`${todosUrl}?tagId=${tagId}`);
  const data = await result.json();
  return data;
};

export const deleteTodos = async (todo) => {
  const result = await fetch(`${todosUrl}/${todo.id}`, {
    method: 'DELETE',
  });
  const data = await result.json();
  return data;
}

export const updateTodo = async (todo) => {
  const result = await fetch(`${todosUrl}/${todo.id}`, {
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH"
  });
  const data = await result.json();
  return data;
}