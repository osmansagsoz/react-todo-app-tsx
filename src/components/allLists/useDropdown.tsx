import { useCallback, useState } from "react";

export const useDropdown = ({ initialClosed }: {initialClosed: boolean}) => {
  const [closed, setClosed] = useState(initialClosed);

  const toggleLists = useCallback(() => {
    setClosed((prevClosed) => !prevClosed);
  }, []);

  return [closed, toggleLists, setClosed];
};
