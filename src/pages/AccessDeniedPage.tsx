import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AccessDeniedPage() {
  const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">
          Access Denied !!
        </h1>
        <span className="font-medium">You don't have access to this page!</span>
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-2)}
            className="font-bold uppercase"
          >
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} className="font-bold uppercase">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
