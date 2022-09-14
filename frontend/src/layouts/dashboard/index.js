/* eslint-disable no-unused-vars */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "layouts/dashboard/Task";
import { useState, useEffect } from "react";
import "./index.css";
import { css, cx } from "@emotion/css";
import ArgonButton from "components/ArgonButton";
import { AddTasksDialog } from "./AddTasksDialog";
import { useGetTasks, useUpdateTasks } from "queries/tasks.queries";

const listItems = [
  {
    status: "pending",
    name: "Pending Task",
    data: [],
  },
  { status: "onGoing", name: "Ongoing Task", data: [] },
  { status: "completed", name: "Completed", data: [] },
  { status: "inDev", name: "In Development", data: [] },
];

const styles = {
  dragger: css(
    `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`
  ),
  dropper: css(`w-auto px-4 min-w-1/4 max-w-1/2`),
  draggerContent: css(`flex items-center space-x-3 text-base`),
  draggerIcon: css(
    `inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`
  ),
  dragging: css(`bg-gray-300`),
  dropOver: css(`bg-gray-100`),
};

function Default() {
  const [listData, setListData] = useState(listItems);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const getListNews = useGetTasks({});

  const { data: dataTasks, refetch, isSuccess } = getListNews;
  const { mutate, isLoading } = useUpdateTasks();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const dataItems = Array.from(listData);
    const [reorderedItem] = dataItems
      .find((doc) => doc.status === result.source.droppableId)
      .data.splice(result.source.index, 1);
    dataItems
      .find((doc) => doc.status === result.destination.droppableId)
      .data.splice(result.destination.index, 0, reorderedItem);
    setListData(dataItems);
    if (
      result.destination.index != result.source.index ||
      result.source.droppableId != result.destination.droppableId
    ) {
      mutate({
        id: reorderedItem.id,
        status: result.destination.droppableId,
        index: result.destination.index + 1,
      });
    }
  }

  const handleCloseDialog = () => {
    setOpen(false);
    setStatus(null);
  };

  const AddTask = (status) => {
    setOpen(true);
    setStatus(status);
  };

  useEffect(() => {
    if (isSuccess && dataTasks && dataTasks.length > 0) {
      listItems.map((doc) => {
        doc.data = dataTasks.filter((item) => item.status === doc.status);
      });
      setListData([...listItems]);
    }
  }, [isSuccess, dataTasks]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container spacing={3} mb={3}>
            {listData.map((dataStatus, index) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={"Grid-data-" + index}>
                  <Card>
                    <ArgonBox pt={3} px={2}>
                      <ArgonTypography variant="h6" foneight="medium">
                        {dataStatus.name}
                      </ArgonTypography>
                    </ArgonBox>
                    <ArgonBox pt={1} pb={2} px={2}>
                      <Droppable droppableId={dataStatus.status}>
                        {(provided, snapshot) => (
                          <ArgonBox
                            component="ul"
                            display="flex"
                            flexDirection="column"
                            p={0}
                            m={0}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cx(
                              styles.dropper,
                              snapshot.isDraggingOver && styles.dropOver
                            )}
                          >
                            {dataStatus.data.map(({ id, name, description, type }, index) => {
                              return (
                                <Draggable key={id} draggableId={id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={cx(
                                        styles.dragger,
                                        snapshot.isDragging && styles.dragging
                                      )}
                                    >
                                      <Task name={name} description={description} type={type} />
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </ArgonBox>
                        )}
                      </Droppable>
                      <ArgonButton
                        onClick={(e) => {
                          AddTask(dataStatus.status);
                        }}
                        variant="outlined"
                        color="info"
                        size="small"
                        rel="noreferrer"
                      >
                        Add
                      </ArgonButton>
                    </ArgonBox>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </DragDropContext>
      </ArgonBox>
      <AddTasksDialog open={open} status={status} onClose={handleCloseDialog} />
    </DashboardLayout>
  );
}

export default Default;
