import { Loader2 } from "lucide-react";

export default function LoadPage() {
  return (
    <div className="container py-4 flex justify-center">
      <Loader2 className="animate-spin size-12 text-primary" />
    </div>
  );
}
