import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import Tasks from "./pages/tasks/Tasks.tsx";
import TaskCreate from "./pages/tasks/TaskCreate.tsx";
import TaskUpdate from "./pages/tasks/TaskUpdate.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/tasks">
        <Route index element={<Tasks />} />
        <Route path="create" element={<TaskCreate />} />
        <Route path="update/:id" element={<TaskUpdate />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
