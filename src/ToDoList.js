/** @format */

import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "./Contexts/TodoContext";
import { TosatContext } from "./Contexts/ToastContext";
//components
import Todo from "./Todo";

export default function TodoList() {
  // Start Stats
  const [titleInput, setTitleInput] = useState("");
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(TosatContext);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);
  const [displayTodosType, setDisplayTodosType] = useState("all");

  //End Stats

  // Start Functions
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      discription: "",
      isCompleted: false,
    };
    const updatedTodo = [...todos, newTodo];
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setTitleInput("");
    showHideToast('تمت الااضافة بنجاح');
  }
  function changeDisplayType(e) {
    setDisplayTodosType(e.target.value);
  }
  // End Functions

  // start  filtrition Array
  const complaetedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const nonComplaetedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRender = todos;
  if (displayTodosType === "completed") {
    todosToBeRender = complaetedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRender = nonComplaetedTodos;
  } else {
    todosToBeRender = todos;
  }
  const todosJsx = todosToBeRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  // End  filtrition Array
  return (
    <Container maxWidth='sm'>
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
        }}>
        <CardContent>
          <Typography variant='h3' style={{ fontWeight: "bold" }}>
            مهامي
            {/* start Line under the word مهامي */}
            <Divider />
            {/* start Line under the word مهامي */}
            {/* start toggle buttons  */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "20px" }}
              value={displayTodosType}
              exclusive
              onChange={changeDisplayType}
              aria-label='text alignment'
              color='primary'>
              <ToggleButton value='non-completed' aria-label='right aligned'>
                غير المنجز
              </ToggleButton>
              <ToggleButton value='completed' aria-label='centered'>
                المنجز
              </ToggleButton>
              <ToggleButton value='all' aria-label='left aligned'>
                الكل
              </ToggleButton>
            </ToggleButtonGroup>
            {/* End toggle buttons  */}
            {/* start todo */}
            {todosJsx}
            {/* end todo */}
            {/* Start inputs and Add */}
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid size={8}>
                <TextField
                  id='outlined-basic'
                  label='اضافة مهمة'
                  variant='outlined'
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant='contained'
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length === 0}>
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/* End inputs and Add */}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
