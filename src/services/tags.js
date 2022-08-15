const tagsUrl = `${process.env.REACT_APP_TODO_API_BASE_URL}/tags`;

export const createTag = async ({ name }) => {
  const result = await fetch(tagsUrl, {
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
  });

  const data = await result.json();
  return data;
};

export const getAllTags = async () => {
  const result = await fetch(tagsUrl);
  const data = await result.json();
  return data;
};

export const deleteTag = async (tag) => {
  const result = await fetch(`${tagsUrl}/${tag.id}`, {
    method: 'DELETE',
  });
  const data = await result.json();
  return data;
}

