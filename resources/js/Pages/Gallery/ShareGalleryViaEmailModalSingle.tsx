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

function ShareGalleryViaEmailModalSingle({
  openSingleModal,
  setSingleModalOpen,
  event,
  video_link
}: {
  openSingleModal: boolean;
  setSingleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
  video_link: string;
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
          setSingleModalOpen(false)
        },
        onError: () => {
          showToast('error', 'Failed to share gallery. Please try again.', {position: 'bottom-right'});
        }
      });
  };

  return (
    <>
    <Dialog open={openSingleModal} onOpenChange={setSingleModalOpen}>
      <DialogContent className="sm:max-w-[535px] top-[15%] translate-y-0">
        <DialogHeader className="border-b">
          <DialogTitle className="card-title">Share Video Via Email</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        Share this gallery by adding an email address
        <div className="flex justify-center items-center">
          <div className="input-group w-full">
            <input
              type="email"
              className="form-control !border-s"
              placeholder="email-to@share.com"
              value={email}
              onChange={(e) => {
                setData('email', e.target.value);
                setEmail(e.target.value)}
              }
              onKeyPress={handleKeyPress}
              autoComplete="email"
              aria-describedby="button-addon01"
            />
            <button
              aria-label="Add email"
              type="button"
              className="ti-btn bg-primary text-white !m-0"
              onClick={handleAddEmail}
            >
              <Plus />
            </button>
          </div>
        </div>
        <InputError message={errors.email} />
        
        {message.text && (
          <div className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </div>
        )}
        
        <div className="box-body">
          {emails.length > 0 && (
            <ul className="list-none files-main-nav" id="files-main-nav">
              <li className="px-0 pt-0">
                <span className="text-xs">
                  Sharing to...
                </span>
              </li>
             
                <li>
                  <div className="flex items-center gap-2">
                    <div>
                      <span>{data.email}</span>
                    </div>
                    <div className="ms-auto">
                      <span
                        className="font-medium   cursor-pointer"
                        onClick={() => setData('email','')}
                      >
                        <Trash2 size={18} className="text-danger" />
                      </span>
                    </div>
                  </div>
                </li>
            
            </ul>
          )}


        </div>
        
        <DialogFooter className="flex gap-2 justify-end">
          <Button 
            onClick={() => setSingleModalOpen(false)} 
            variant="outline"
            className="ti-btn">
            Cancel
          </Button>
          <Button
            onClick={handleSendEmails}
            disabled={processing || data.email == ""}
            className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white btn-wave waves-effect waves-light"
          >
            {processing ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Toaster 
         toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'black',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'black',
            },
          },
        }}
        />
    </>
  );
}

export default ShareGalleryViaEmailModalSingle;