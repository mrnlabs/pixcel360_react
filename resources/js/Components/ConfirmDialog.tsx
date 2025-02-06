import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/Components/ui/alert-dialog"

  type ConfirmDialogProps = {
    message: string;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onContinue: () => void;
  }

  
  
  const ConfirmDialog = ({
    message,
    dialogOpen, 
    setDialogOpen,
    onContinue
  }: ConfirmDialogProps) => {
    return (
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent className="top-[10%] translate-y-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-200 ti-btn-warning" onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              onContinue();
              setDialogOpen(false);
            }}
            className=" ti-btn-primary"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default ConfirmDialog;