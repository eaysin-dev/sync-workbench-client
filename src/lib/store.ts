import { Column } from "@/pages/kanban/_components/board-column";
import { UniqueIdentifier } from "@dnd-kit/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const defaultCols: Column[] = [
  {
    id: "TODO",
    title: "Todo",
  },
];

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

const initialTasks: Task[] = [
  {
    id: "task1",
    status: "TODO",
    title: "Project initiation and planning",
  },
  {
    id: "task2",
    status: "TODO",
    title: "Gather requirements from stakeholders",
  },
];

interface TaskState {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
}

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: initialTasks,
    columns: defaultCols,
    draggedTask: null,
  } as TaskState,
  reducers: {
    // Action to add a new task
    addTask: (
      state,
      action: PayloadAction<{ title: string; description?: string }>
    ) => {
      const { title, description } = action.payload;
      state.tasks.push({
        id: uuid(),
        title,
        description,
        status: "TODO",
      });
    },

    // Action to update a column name
    updateCol: (
      state,
      action: PayloadAction<{ id: UniqueIdentifier; newName: string }>
    ) => {
      const { id, newName } = action.payload;
      const column = state.columns.find((col) => col.id === id);
      if (column) {
        column.title = newName;
      }
    },

    // Action to add a new column
    addCol: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      const newColumnId = state.columns?.length ? title.toUpperCase() : "TODO";
      state.columns.push({ title, id: newColumnId });
    },

    // Action to drag a task (just set the dragged task ID)
    dragTask: (state, action: PayloadAction<string | null>) => {
      state.draggedTask = action.payload;
    },

    // Action to remove a task
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // Action to remove a column
    removeCol: (state, action: PayloadAction<UniqueIdentifier>) => {
      state.columns = state.columns.filter((col) => col.id !== action.payload);
    },

    // Action to set tasks (e.g., after fetching from an API)
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    // Action to set columns
    setCols: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
  },
});

export const {
  addTask,
  updateCol,
  addCol,
  dragTask,
  removeTask,
  removeCol,
  setTasks,
  setCols,
} = taskSlice.actions;

export default taskSlice.reducer;
