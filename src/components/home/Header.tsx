import { Link } from "react-router-dom";
import { ModeToggle } from "../theme/ModeToggle";

export default function Header() {
  return (
    <header className="border-b border-secondary">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Logo() {
  return (
    <Link to="/" className="text-lg font-semibold">
      TASK<span className="text-primary">MANAGER</span>APP
    </Link>
  );
}
