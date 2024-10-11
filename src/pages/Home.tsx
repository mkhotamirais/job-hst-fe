import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container flex-1 flex flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Task Manager App</h1>
      <p className="text-muted-foreground">
        Contains basic CRUD operations for tasks with search, sorting, and filtering features. Uses React/Vite for the
        frontend, MongoDB for the database, and Express for the backend.
      </p>
      <Button asChild>
        <Link to="/tasks">Get Started</Link>
      </Button>
    </div>
  );
}
