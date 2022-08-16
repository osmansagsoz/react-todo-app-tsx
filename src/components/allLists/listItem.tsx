import { useCallback } from "react";
import { TagType } from "../../types";
import css from "./allLists.module.css";

const ListItem = ({ onSelectedTagChange, selectedTag, tag }: { onSelectedTagChange: (params: TagType) => void; selectedTag: TagType; tag: TagType}) => {
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
