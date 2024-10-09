import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-secondary py-6">
      <div className="container flex items-center justify-center">
        <small>
          &copy; 2022
          <Link to="https://tamionweb.my.id" className="text-primary font-semibold hover:underline">
            Tamionweb
          </Link>
        </small>
      </div>
    </footer>
  );
}
