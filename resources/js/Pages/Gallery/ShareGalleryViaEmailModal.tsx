import { useState } from "react";
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

function ShareGalleryViaEmailModal({
  open,
  setOpen,
  event,
  gallery_link
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
  gallery_link: string;
}) {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { data, setData, post, processing, errors, reset } = useForm({
      emails: [],
      event_id: event.id,
      gallery_link: gallery_link,
      terms_and_conditions: '0'
  });

  const handleAddEmail = () => {
    if (!email) {
      setMessage({ text: "Please enter an email address", type: "error" });
      return;
    }
    if(!data.terms_and_conditions){
      setMessage({ text: "Please accept terms and conditions", type: "error" });
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
    setData('emails', [...emails, email]);
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
    if (emails.length === 0) {
      setMessage({ text: "Please add at least one email address", type: "error" });
      return;
    }

    post(route('share_gallery_via_email', event.slug),{
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setEmails([]);
          showToast('success', 'Email sent successfully!', {position: 'bottom-right'});
        },
        onError: () => {
          showToast('error', 'Failed to share gallery. Please try again.', {position: 'bottom-right'});
        }
      });
  };

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[535px] top-[15%] translate-y-0">
        <DialogHeader className="border-b">
          <DialogTitle className="card-title">Share via Email</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        Share this gallery by adding one or more email addresses
        <div className="flex justify-center items-center">
          <div className="input-group w-full">
            <input
              type="email"
              className="form-control !border-s"
              placeholder="email-to@share.com"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              onKeyPress={handleKeyPress}
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
        <InputError message={errors.emails} />
        
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
              {emails.map((email, index) => (
                <li key={index}>
                  <div className="flex items-center gap-2">
                    <div>
                      <span>{email}</span>
                    </div>
                    <div className="ms-auto">
                      <span
                        className="font-medium   cursor-pointer"
                        onClick={() => handleRemoveEmail(email)}
                      >
                        <Trash2 size={18} className="text-danger" />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

<div className="form-check flex items-center gap-2 mt-4">
    <input onChange={(e) => setData('terms_and_conditions', e.target.checked ? '1' : '0')} required={true} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> 
    <label className="form-check-label" htmlFor="flexCheckChecked"> I grant my permission to use this email to send me emails.
</label>
<InputError message={errors.terms_and_conditions} />
</div> 
        </div>
        
        <DialogFooter className="flex gap-2 justify-end">
          <Button 
            onClick={() => setOpen(false)} 
            variant="outline"
            className="ti-btn">
            Cancel
          </Button>
          <Button
            onClick={handleSendEmails}
            disabled={processing || emails.length === 0}
            className="ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave waves-effect waves-light"
          >
            {processing ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Toaster/>
    </>
  );
}

export default ShareGalleryViaEmailModal;