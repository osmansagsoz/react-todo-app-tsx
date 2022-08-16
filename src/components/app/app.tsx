import css from "./app.module.css";
import AllLists from "../allLists/allLists";
import { Container } from "../container/container";
import Footer from "../footer/footer";
import TodoListArea from "../todoListArea/todoListArea";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createTag, deleteTag, getAllTags } from "../../services/tags";
import { createTodo, deleteTodos, getTodos, updateTodo } from "../../services/todos";
import { TagType } from "../../types";

// console.log(css);
export const App = () => {
  const [tags, setTags] = useState();
  const [tagsError, setTagsError] = useState(false);

  const [selectedTag, setSelectedTag] = useState({});

  const [selectedTagTodos, setSelectedTagTodos] = useState();
  const [todosError, setTodosError] = useState(false);

  const appState = useMemo(() => {
    // This is for checking the status of a request
    // Can be used both for tags, and selectedTagTodos
    if (tagsError || todosError) {
      // show error
      return "There was an error!";
    } else if (tags === undefined || selectedTagTodos === undefined) {
      // loading
      return "Loading";
    } else if (tags.length === 0) {
      // empty
      return "There are no tags!";
    } else if (selectedTagTodos.length === 0) {
      // empty
      return "There are no todos!";
    } else if (tags.length > 0) {
      // have data
      return "Tags data loaded!";
    }
  }, [selectedTagTodos, tags, tagsError, todosError]);

  const onTagCreated = useCallback(async ({ name }) => {
    // Handle errors with try & catch here!
    try {
      const data = await createTag({ name });
      setTags((prevTags) => [...prevTags, data]);
    } catch (err) {
      setTagsError(true);
      console.log(err);
    }
  }, []);

  const onTodoCreated = useCallback(async (todo) => {
    try {
      const data = await createTodo(todo);
      setSelectedTagTodos((prevTodos) => [...prevTodos, data]);
    } catch (err) {
      setTodosError(true);
      console.log(err);
    }
  }, []);

  const onSelectedTagChange = useCallback(
    (nextSelectedTag: TagType) => {
      const tagIndex = tags.findIndex((tag) => tag.id === nextSelectedTag.id);
      if (tagIndex > -1) {
        setSelectedTag(nextSelectedTag);
      }
    },
    [tags]
  );

  const onTodoChange = useCallback(async (todo) => {
    console.log(todo, "onTodoChange");
    setSelectedTagTodos((prev) => {
      const todoIndex = prev.findIndex((i) => i.id === todo.id);
      if (todoIndex > -1) {
        return [...prev.slice(0, todoIndex), todo, ...prev.slice(todoIndex + 1)];
      }
      return prev;
    });
    await updateTodo(todo);
  }, []);

  const onTodoDelete = useCallback(async (todo) => {
    setSelectedTagTodos((prev) => {
        const todoIndex = prev.findIndex((i) => i.id === todo.id);
        if (todoIndex > -1) {
          return [...prev.slice(0, todoIndex), ...prev.slice(todoIndex + 1)];
        }
        return prev;
      });
      await deleteTodos(todo);
  }, [])

  const onListDelete = useCallback(async (selectedTag) => {
    setTags((prev) => {
        const tagIndex = prev.findIndex((i) => i.id === selectedTag.id);
        if (tagIndex > -1) {
            setSelectedTag(tags[tags.length !== 1 ? tags.length - 2 : tags.length - 1]);
          return [...prev.slice(0, tagIndex), ...prev.slice(tagIndex + 1)];
        }
        return prev;
      });
      await deleteTag(selectedTag);
  }, [tags])

  useEffect(() => {
    getAllTags()
      .then((data) => {
        // Set local tags in state
        setTags(data);
        // If we have tags, set initial selected tag
        if (data.length) {
          setSelectedTag(data[0]);
        }
      })
      .catch((e) => {
        // Update state if there's an error while loading tags
        setTagsError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedTag !== undefined) {
      getTodos(selectedTag.id).then((data) => {
        setSelectedTagTodos(data);
      });
    }
  }, [selectedTag]);

  console.log("tags", tags);
  console.log("selectedTag", selectedTag);
  console.log("selectedTagTodos", selectedTagTodos);

  return (
    <div className={css.app}>
      <AllLists
        onSelectedTagChange={onSelectedTagChange}
        onTagCreated={onTagCreated}
        selectedTag={selectedTag}
        tags={tags}
      />
      <Container
        tags={tags}
        onTagCreated={onTagCreated}
        onTodoCreated={onTodoCreated}
        appState={appState}
      />
      <TodoListArea
        todos={selectedTagTodos}
        onTodoChange={onTodoChange}
        onTodoDelete={onTodoDelete}
        onListDelete={onListDelete}
        selectedTag={selectedTag}
      />
      <Footer />
    </div>
  );
};
