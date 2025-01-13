import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  status: string;
}
// Initial state
const initialState = {
  tasks: [] as Task[],
  loading: false,
  error: null as string | null | undefined,
  status: "All",
};

// Async thunk to fetch tasks
export const fetchTodo = createAsyncThunk("task/fetchTodo", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data = await response.json();

  // Returning the transformed data
  return data.map((task: Task) => ({
    id: task.id,
    title: task.title,
    description: "",
    status: task.completed ? "Completed" : "To Do",
  }));
});

// Create slice
const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { addTask, editTask, deleteTask } = TaskSlice.actions;
export default TaskSlice.reducer;
