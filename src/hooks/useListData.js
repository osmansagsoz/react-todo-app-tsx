import { useState } from "react";

const useListData = () => {
    const [listData, setListData] = useState({ listTitle: "", listId: "", todos: [] });

    const listChange = (e) => {
        const {name, value} = e.target;
        setListData({
          ...listData,
          [name]: value
        })
      }

      return [listData, listChange, setListData];
}

export default useListData;