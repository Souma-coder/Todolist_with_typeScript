import React, { useState, useRef } from "react";
import { ItodoItem } from "../types/todo";
import Todo from "./Todo";
import styles from "../styles/TodoList.module.css";

const Todolist = () => {
  const todoCounter = useRef(1);
  const [todoList, setTodoList] = useState<ItodoItem[]>([
    {
      id: todoCounter.current,
      item: "",
      createdAt: new Date(),
    },
  ]);

  const getTodoTime = (date?: Date) => {
    return date != null ? date.getTime() : 0;
  };

  const addToStart = () => {
    const nextId = todoCounter.current + 1;
    setTodoList((prevList) => [
      {
        id: nextId,
        item: "",
        createdAt: new Date(),
      },
      ...prevList,
    ]);
    todoCounter.current = nextId;
  };

  const addToEnd = () => {
    const nextId = todoCounter.current + 1;
    setTodoList((prevList) => [
      ...prevList,
      {
        id: nextId,
        item: "",
        createdAt: new Date(),
      },
    ]);
    todoCounter.current = nextId;
  };

  const sortByEarliest = () => {
    setTodoList((prevList) => {
      let newList = [...prevList];
      newList.sort((a, b) => {
        return getTodoTime(a.createdAt) - getTodoTime(b.createdAt);
      });
      return newList;
    });
  };

  const sortByLatest = () => {
    setTodoList((prevList) => {
      let newList = [...prevList];
      newList.sort((a, b) => {
        return getTodoTime(b.createdAt) - getTodoTime(a.createdAt);
      });
      return newList;
    });
  };

  const handleDelete = (id: number) => {
    setTodoList((prevList) =>
      prevList.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const handleItemChange = (id: number, item: string) => {
    setTodoList((prevList) => {
      let newList = prevList;
      newList.forEach((todo) => {
        if (todo.id === id) {
          todo.item = item;
        }
      });
      return newList;
    });
  };

  const todoListItem = todoList.map((todo, index) => (
    <Todo
      key={todo.id}
      index={index}
      {...todo}
      handleItemChange={handleItemChange}
      handleDelete={handleDelete}
    />
  ));

  return (
    <>
      <h1 className={styles.todoHead}>Todo List</h1>
      <div className={styles.container}>
        <div className={styles.buttonBoxes}>
          <button onClick={addToStart} className={styles.buttonStyle}>
            Add to start
          </button>
          <button onClick={addToEnd} className={styles.buttonStyle}>
            Add to end
          </button>
          <button onClick={sortByEarliest} className={styles.buttonStyle}>
            Sort by earliest
          </button>
          <button onClick={sortByLatest} className={styles.buttonStyle}>
            Sort by latest
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.todoHead}>Sl. No.</th>
              <th className={styles.todoHead}>Item</th>
              <th className={styles.todoHead}>Created at</th>
              <th className={styles.todoHead}>Actions</th>
            </tr>
          </thead>
          <tbody>{todoListItem}</tbody>
        </table>
      </div>
    </>
  );
};

export default Todolist;
