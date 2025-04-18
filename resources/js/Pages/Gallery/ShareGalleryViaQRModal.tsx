import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Event } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import showToast from "@/utils/showToast";
import InputError from "@/Components/InputError";
import { Toaster } from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";
import { downloadQRCode } from "@/utils/downloadQRCode";

function ShareGalleryViaQRModal({
  openQRModal,
  setQRModalOpen,
  event,
  video_link,
  title
}: {
  openQRModal: boolean;
  setQRModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
  video_link: string;
  title: string
}) {
  console.log(video_link)
 

     
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { data, setData, post, processing, errors, reset } = useForm({
      email: '',
      event_id: event.id,
      video_link: video_link,
  });

  useEffect(() => {
    if (video_link) {
      setData("video_link", video_link)
    }
  }, [video_link]);
  const handleAddEmail = () => {
    if (!email) {
      setMessage({ text: "Please enter an email address", type: "error" });
      return;
    }
   

    if (!validateEmail(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    if (emails.includes(email)) {
      setMessage({ text: "Email already added", type: "error" });
      return;
    }

    setEmails([...emails, email]);
    // @ts-ignore
    setData("email", email);
    setEmail("");
    setMessage({ text: "", type: "" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSendEmails = async () => {
    if (!data.email) {
      setMessage({ text: "Please add at least one email address", type: "error" });
      return;
    }

    post(route('share_single_video_gallery_via_email'),{
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setEmails([]);
          reset('email');
          showToast('success', 'Email sent successfully!', {position: 'bottom-right'});
          setQRModalOpen(false)
        },
        onError: () => {
          showToast('error', 'Failed to share gallery. Please try again.', {position: 'bottom-right'});
        }
      });
  };

  return (
    <>
    <Dialog open={openQRModal} onOpenChange={setQRModalOpen}>
      <DialogContent className="sm:max-w-[535px] top-[15%] translate-y-0">
        <DialogHeader className="border-b">
          <DialogTitle className="card-title">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
       
        
        <div className="flex justify-center items-center" id="qr-code">
                <QRCodeSVG
                    value={video_link}
                    title={"Share via QR Code"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    minVersion={6}
                    />
                    
                </div>
        
                <div className="flex gap-2 justify-center border-t border-t-gray-300 pt-4">
                <Button 
                  onClick={() => setQRModalOpen(false)} 
                  variant="outline"
                  className="ti-btn">
                  Cancel
                </Button>
                <Button
                  onClick={() => downloadQRCode('',event)}
                  className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white btn-wave waves-effect waves-light"
                >
                  Download
                </Button>
        </div>
      </DialogContent>
    </Dialog>
    <Toaster/>
    </>
  );
}

export default ShareGalleryViaQRModal;