import { Snackbar, Alert, Slide } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Toast = ({ open, handleClose, message, severity }) => {
  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        key={SlideTransition.name}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
