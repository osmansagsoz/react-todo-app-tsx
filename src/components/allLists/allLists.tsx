import css from "./allLists.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ListItem from "./listItem";
import { Loader } from "../loader/loader";
import { useDropdown } from "./useDropdown";
import { useState, useCallback, FunctionComponent } from "react";

const AllLists: FunctionComponent = ({ onSelectedTagChange, onTagCreated, selectedTag, tags }) => {
  const [closed, toggleLists] = useDropdown({ initialClosed: true });

  const [newTag, setNewTag] = useState("");

  const onNewTagChange = useCallback((event) => setNewTag(event.target.value), []);

  const handleListSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const newTagName = newTag.trim(); // "  asdas  " => "asdas"
      if (newTagName) {
        onTagCreated({ name: newTagName });
        setNewTag("");
      }
    },
    [newTag, onTagCreated]
  );

  return (
    <section className={css.allLists}>
      <button className={css.listsButton} onClick={toggleLists}>
        <FontAwesomeIcon icon={faList} />
        <h3 className={css.todoListsTitle}>My Lists</h3>
      </button>
      <div className={closed ? css.dropdown : css.dropdownOpen}>
      {tags ? (
        <ul className={css.todoLists}>
          {tags.map((tag) => (
            <ListItem
              key={tag.id}
              onSelectedTagChange={onSelectedTagChange}
              selectedTag={selectedTag}
              tag={tag}
            />
          ))}
        </ul>
      ) : (
        <Loader />
      )}
      <form onSubmit={handleListSubmit}>
        <input
          type="text"
          name="listTitle"
          value={newTag}
          onChange={onNewTagChange}
          className={css.newList}
          placeholder="New list name"
          aria-label="New list name"
        />
        <button className={css.listButton} aria-label="Create new list" type="submit">
          +
        </button>
      </form>
    </div>
    </section>
  );
};

export default AllLists;
