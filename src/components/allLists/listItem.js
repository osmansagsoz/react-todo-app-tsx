import { useCallback } from "react";
import css from "./allLists.module.css";

const ListItem = ({ onSelectedTagChange, selectedTag, tag }) => {
  const handleListClick = useCallback(() => {
    onSelectedTagChange(tag);
  }, [onSelectedTagChange, tag]);

  return (
    <li onClick={handleListClick} className={selectedTag.id === tag.id ? css.activeList : null}>
      {tag.name}
    </li>
  );
};

export default ListItem;
