import React, { useEffect, useState } from "react";
import styles from "../styles/TodoList.module.css";

type TodoProps = {
  index: number;
  id: number;
  item: string;
  createdAt: Date;
  handleItemChange: (id: number, item: string) => void;
  handleDelete: (id: number) => void;
};

const Todo = ({
  index,
  id,
  item,
  createdAt,
  handleItemChange,
  handleDelete,
}: TodoProps) => {
  const [todoItem, setTodoItem] = useState(item);
  const [isEditModeOn, setEditMode] = useState(true);

  const isInputFocusChange = () => {
    if (todoItem !== "") {
      setEditMode(false);
    }
  };

  useEffect(() => {
    handleItemChange(id, todoItem);
  }, [todoItem, id, handleItemChange]);

  return (
    <>
      <tr>
        <td className={styles.todoHead}>{index + 1}</td>
        <td>
          {isEditModeOn ? (
            <input
              value={todoItem}
              onBlur={isInputFocusChange}
              onChange={(e) => {
                setTodoItem(e.target.value);
              }}
              className={styles.inputStyle}
            />
          ) : (
            <div className={styles.divStyle}>{todoItem}</div>
          )}
        </td>
        <td className={styles.todoHead}>{createdAt.toLocaleTimeString()}</td>
        <td>
          <div className={styles.actionButtons}>
            <button
              onClick={() => setEditMode(true)}
              className={styles.actionButtonStyle}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(id)}
              className={styles.actionButtonStyle}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Todo;
