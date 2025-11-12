import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

// ✅ Load your Stripe publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_stripe_key
);

const Payment = () => {
  return (
    <div className="p-6">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;
