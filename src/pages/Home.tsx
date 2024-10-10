import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container flex-1 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Task Manager App</h1>
      <p>deskripso job hst</p>
      <Button asChild>
        <Link to="/tasks">Get Started</Link>
      </Button>
    </div>
  );
}
