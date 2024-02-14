import axios from "axios";
import { toast } from "react-toastify";


const baseUrl = "http://localhost:3000";

export const getAllTask = async (created_by) => {
  try {
    let response = await axios.get(`${baseUrl}/Tasks`, {
      params: {
        created_by,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (newTask) => {
  try {
    await axios
      .post(`${baseUrl}/Tasks/`, newTask)
      .then(() => {
        toast.success("Task created successfully");
      })
      .catch(() => {
        console.log("Some issue occured");
      });
  } catch (error) {
    console.error("Error updating task:", error);
    
  }
};

export const updateTask = async (taskId, updatedTaskData, stage = 0) => {
  try {
    const response = stage ? await axios.patch(
      `${baseUrl}/Tasks/${taskId}`,
      updatedTaskData
    ):await axios.put(
      `${baseUrl}/Tasks/${taskId}`,
      updatedTaskData
    );
    toast.success("Task updated successfully");
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Error updating task:", error);
    
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${baseUrl}/tasks/${taskId}`);
    toast.success("Task deleted successfully");
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Error Deleting task:", error);
    
  }
  console.log(`Deleted task with ID ${taskId} `);
};

export const getTaskCount = async (created_by) => {
  try {
    let response = await axios.get(`${baseUrl}/tasks`, {
      params: {
        created_by,
      },
    });
    let total = response.data.length;
    let pending = response.data.filter((item) => item.stage != 3).length;
    return { total, pending };
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Error fetching task count:", error);
    return {
      total: 0,
      completed: 0,
      pending: 0,
    };
  }
};

export const loginApi = async (email, password) => {
  try {
    const response = await axios.get(`${baseUrl}/users`, {
      params: {
        email,
        password,
      },
    });
    return {
      dataLength: response.data.length,
      userDetails: response.data[0],
      status: response.status,
    };
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Login API error:", error);
    
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, userData);

    return response.status;
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Login API error:", error);
    
  }
};
