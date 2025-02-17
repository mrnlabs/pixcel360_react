import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { PaymentMethod } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from "@/hooks/use-toast";

// Separate the form into its own component
function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);

    const { toast } = useToast();

    const {data, setData, post, processing } = useForm({
        payment_method: '',
    })
      // Get setupIntent from page props
      const { setupIntent } = usePage().props;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setError(null);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

      

        const { setupIntent: response, error } = await stripe.confirmCardSetup(
            setupIntent.client_secret,
            {
                payment_method: {
                    card: cardElement,
                }
            }
        );

        if (error) {
            setError(error.message ?? 'An error occurred');
            // setProcessing(false);
            setData('payment_method', '');
        } else if (response) {
            setData('payment_method', response.payment_method);
            post(route('payment-methods.store'), {
               onSuccess: () => {
                   setData('payment_method', '');
                   toast({
                    title: "Success",
                    description: "Payment method added successfully",
                    variant: "default",
                })
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                })
            }
            });
            // setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border rounded-md bg-white">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            
            {error && (
                <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Processing...' : 'Add Payment Method'}
            </button>
        </form>
    );
}

function CreateModal({
    open,
    setOpen
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    // Initialize Stripe outside of the component
    const stripePromise = loadStripe(usePage().props.stripeKey);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] top-[15%] translate-y-0">
                <DialogHeader className="border-b">
                    <DialogTitle className="card-title">Add Payment Method</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="box-body">
                    <Elements stripe={stripePromise}>
                        <PaymentForm />
                    </Elements>
                </div>
                <Button 
                    onClick={() => setOpen(false)} 
                    className="ti-btn ti-btn-primary btn-wave waves-effect waves-light"
                >
                    Dismiss
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default CreateModal;