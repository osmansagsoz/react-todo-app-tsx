import {useCallback, useState} from 'react';


const useTodoData = () => {
    
    const [todoData, setTodoData] = useState({
        id: "",
        title: "",
        completed: false,
        time: "",
        priority: "",
        tagId: "",
        tagName: ""
      });
      
      const handleChange = useCallback((event) => {
        const {name, value, type, checked} = event.target

        setTodoData({
          ...todoData,
          [name]: type === "checkbox" ? checked : value
        });
    }, [todoData])
    return [todoData, handleChange, setTodoData];
}

export default useTodoData;