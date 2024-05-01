import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
export function CustomAlertDialog({
  children,
  alertDialogDescription,
  purpose,
  onClickFunction,
}: {
  children: ReactNode;
  alertDialogDescription: string;
  purpose: string;
  onClickFunction: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {alertDialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`${
              purpose === "deleteListing"
                ? "bg-red-600 hover:bg-red-800"
                : "bg-orange-600 hover:bg-orange-800"
            }`}
            onClick={onClickFunction}
          >
            {purpose === "deleteListing" ? "Delete" : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
