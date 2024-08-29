import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SaveButtonProps = {
  onSave: (data: any) => void;
  isLoading: boolean;
};

export function SaveButton({ onSave, isLoading }: SaveButtonProps) {
  return (
    <Button
      type="submit"
      className="uppercase font-bold"
      onClick={() => onSave()}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Saving</span>
        </>
      ) : (
        <span>Save</span>
      )}
    </Button>
  );
}
