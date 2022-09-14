import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const axios = require("axios");

function useGetTasks(params) {
  return useQuery(["all-tasks", params], async () => {
    const res = await axios.get(`/tasks`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  });
}

function useAddTasks() {
  const queryClient = useQueryClient();
  return useMutation(async (data) => await axios.post(`/tasks/create`, data), {
    // when success auto call useGetNews with key: "all-news"
    onSuccess: () => {
      toast.success("Create Success!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries("all-tasks");
    },
    onError: (e) => {
      toast.error("Create Fail! " + e.response.data.message[0], {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
}

function useUpdateTasks() {
  const queryClient = useQueryClient();
  return useMutation(async (data) => await axios.post(`/tasks/update`, data), {
    // when success auto call useGetNews with key: "all-news"
    onSuccess: () => {
      toast.success("Update Success!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries("all-tasks");
    },
  });
}

export { useGetTasks, useAddTasks, useUpdateTasks };
