import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function UserNotApprovedPage() {
    const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">Hurray!!</h1>
        <span className="font-medium">You have made the right decision!</span>
        <p className="text-center text-muted-foreground">
          Please wait until the admin review's and approve's your profile.
        </p>
        <div className="mt-6 flex gap-4">
          <Button onClick={() => navigate("/")} className="font-bold uppercase">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
