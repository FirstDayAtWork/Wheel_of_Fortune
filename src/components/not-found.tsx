import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Heading } from "./ui/typography";

export default function NotFound() {
  return (
    <div className="container m-auto px-4 py-16 lg:px-20">
      <div className="mx-auto w-full max-w-xs space-y-8 text-center">
        <div className="space-y-2 text-center">
          <Heading size="h2">Page Not Found!</Heading>
        </div>
        <Button asChild className="px-2 py-0">
          <Link to="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
}
