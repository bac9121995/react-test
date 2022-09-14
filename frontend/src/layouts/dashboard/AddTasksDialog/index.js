import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { tasksSchema } from "./schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, Controller } from "react-hook-form";
import ArgonBox from "components/ArgonBox";
import { useAddTasks } from "queries/tasks.queries";
import { Label } from "examples/Label";

export const AddTasksDialog = (props) => {
  const { open, onClose } = props;
  const [error] = useState(false);
  const methods = useForm({
    resolver: yupResolver(tasksSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = methods;
  const { mutate, isSuccess, isLoading } = useAddTasks();
  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, status: props.status });
  });

  useEffect(() => {
    if (isSuccess) {
      onClose();
      reset();
    }
  }, [isSuccess]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <FormProvider>
          <ArgonBox component="form" onSubmit={onSubmit}>
            <DialogTitle>Add Task</DialogTitle>
            <DialogContent>
              <ArgonBox mb={3}>
                <Label required={true}>Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      helperText={error?.message ? error?.message : null}
                      error={invalid}
                      placeholder="Type name..."
                      {...field}
                      sx={{ root: { height: "50px" }, mt: 1 }}
                    />
                  )}
                />
              </ArgonBox>
              <ArgonBox mb={3}>
                <Label required={true}>Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      helperText={error?.message ? error?.message : null}
                      error={invalid}
                      placeholder="Type description..."
                      {...field}
                      sx={{ root: { height: "50px" }, mt: 1 }}
                    />
                  )}
                />
              </ArgonBox>
              <ArgonBox mb={3}>
                <Label required={true}>Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      helperText={error?.message ? error?.message : null}
                      error={invalid}
                      placeholder="Type headline..."
                      {...field}
                      sx={{ root: { height: "50px" }, mt: 1 }}
                    />
                  )}
                />
              </ArgonBox>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </ArgonBox>
        </FormProvider>
      </Dialog>
    </>
  );
};
