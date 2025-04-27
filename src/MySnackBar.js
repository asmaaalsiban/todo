/** @format */

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, message }) {
  const action = <React.Fragment></React.Fragment>;

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message='Note archived'
        action={action}>
        <Alert variant='filled' severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
