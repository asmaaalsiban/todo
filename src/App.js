/** @format */

import "./App.css";
import ToDoList from "./ToDoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./Contexts/TodoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MySnackBar from "./MySnackBar";
import { TosatContext } from "./Contexts/ToastContext";

const todosIn = [
  {
    id: uuidv4(),
    title: "مشاهدة فيديوهات",
    discription: "وصلت عند الفيديو 75",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "تعلم انكليش",
    discription: "وصلت عند الفيديو 19",
    isCompleted: false,
  },
];
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#d32f2f",
    },
  },
});

function App() {
  // start states
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [todos, setTodos] = useState(todosIn);
  // End states
  // start function
  function showHideToast(message) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setMessage(message);
  }
  // End function
  return (
    <ThemeProvider theme={theme}>
      <TosatContext.Provider value={{ showHideToast }}>
        <div
          className='App'
          style={{
            backgroundColor: "#212121",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            direction: "rtl",
          }}>
          <MySnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos, setTodos }}>
            <ToDoList />
          </TodosContext.Provider>
        </div>
      </TosatContext.Provider>
    </ThemeProvider>
  );
}

export default App;
