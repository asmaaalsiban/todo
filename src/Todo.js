/** @format */
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// Dialog Import
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
// context import
import { useContext, useState } from "react";
import { TodosContext } from "./Contexts/TodoContext";
import { TosatContext } from "./Contexts/ToastContext";
//Icons import
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function Todo({ todo }) {
  // start states
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(TosatContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [todoUpdated, setTodoUpdated] = useState({
    title: "",
    discription: "",
  });

  // end states
  /* start functions */
  function handelChekClick() {
    showHideToast('تم التعديل بنجاح')
    const updatedTodo = todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });

    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }
  // start function Delete
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handelDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handelDeleteConfirm() {
    const updatedTodo = todos.filter((ele) => {
      showHideToast("تم الحذف بنجاح");
      return todo.id !== ele.id;
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }
  // End function Delete
  // start update function
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }
  function handelUpdateConfirm() {
    const updatedTodo = todos.map((t) => {
      showHideToast("تم التعديل بنجاح");
      if (t.id === todo.id) {
        return {
          ...t,
          title: todoUpdated.title,
          discription: todoUpdated.discription,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodo);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  }
  function handelUpdateClick() {
    setShowUpdateDialog(true);
  }
  // End update function
  /* End functions */

  return (
    <>
      {/* Start Update Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>تعديل المهمة</DialogTitle>
        <DialogContent style={{ direction: "ltr" }}>
          <TextField
            autoFocus
            margin='dense'
            variant='standard'
            id='outlined-basic'
            label='عنوان المهمة'
            fullWidth
            value={todoUpdated.title}
            onChange={(e) => {
              setTodoUpdated({ ...todoUpdated, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            variant='standard'
            id='outlined-basic'
            label='تفاصيل'
            fullWidth
            value={todoUpdated.discription}
            onChange={(e) => {
              setTodoUpdated({ ...todoUpdated, discription: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handelUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Update Dialog */}
      {/* Start delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          هل انت متأكد من حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            لا يمكنك الترجع عن الحذف بعد التاكيد
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handelDeleteConfirm}>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* End delete Dialog */}
      {/* start todo card */}
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#1a237e",
          color: "white",
          marginTop: "15px",
        }}>
        <CardContent style={{ padding: "17px" }}>
          <Grid container rowSpacing={1}>
            {/*  start todo title */}
            <Grid size={8}>
              <Typography variant='h6' sx={{ textAlign: "start" }}>
                {todo.title}
              </Typography>
              {/* description Title */}
              <Typography sx={{ textAlign: "start", fontWeight: "200" }}>
                <span style={{ margin: "0px", fontSize: "13px" }}>
                  {todo.discription}
                </span>
              </Typography>
            </Grid>
            {/*  end todo title */}
            {/* start Icons buttons */}
            <Grid
              size={4}
              display='flex'
              justifyContent='space-around'
              alignItems='center'>
              {/*  start delete Button */}
              <IconButton
                onClick={handelDeleteClick}
                className='iconeButtom'
                style={{
                  border: "3px solid  #f44336",
                  color: "#f44336",
                  backgroundColor: "white",
                }}>
                <DeleteIcon />
              </IconButton>
              {/*  start delete Button */}
              {/* start check button */}
              <IconButton
                onClick={() => {
                  handelChekClick();
                }}
                className='iconeButtom'
                style={{
                  border: "3px solid  #43a047",
                  color: todo.isCompleted ? "white" : "#43a047",
                  backgroundColor: todo.isCompleted ? "#43a047" : "white",
                }}>
                <CheckIcon />
              </IconButton>
              {/* end check button */}
              {/* start Edit button */}
              <IconButton
                onClick={handelUpdateClick}
                className='iconeButtom'
                style={{
                  border: "3px solid  #7e57c2",
                  color: "#7e57c2",
                  backgroundColor: "white",
                }}>
                <EditIcon />
              </IconButton>
              {/* End Edit button */}
            </Grid>
            {/* start Icons buttons */}
          </Grid>
        </CardContent>
      </Card>
      {/* End todo card */}
    </>
  );
}
