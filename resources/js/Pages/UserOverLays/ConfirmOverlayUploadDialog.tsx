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
    setData: (field: string, value: any) => void;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onContinue: () => void;
  }

  
  
  const ConfirmOverlayUploadDialog = ({
    message,
    setData,
    dialogOpen, 
    setDialogOpen,
    onContinue
  }: ConfirmDialogProps) => {
    return (
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent className="top-[10%] translate-y-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Choose the session</AlertDialogTitle>
            <AlertDialogDescription>
                <div>
                    <input onChange={(e) => setData('apply_to_all', e.target.checked)} id="apply_to_all" type="checkbox" className="form-check-input checkebox-lg mr-2  mb-2 " />
                    <label htmlFor="apply_to_all" className="form-check-label text-black text-left">Apply to all sessions</label>
                </div>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#FF4F84] text-white hover:bg-[#FF4F84] hover:text-white" onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              onContinue();
              setDialogOpen(false);
            }}
            className=" bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default ConfirmOverlayUploadDialog;