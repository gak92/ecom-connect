import { getStripe } from "../config/stripe.js";

// ============================================================
// Payment Service — Stripe payment logic
// No repository needed — Stripe is an external API, not a DB model
// ============================================================

// 1 - Create a Stripe PaymentIntent and return the client_secret
// Amount must be in the smallest currency unit (cents for USD, paise for INR)
export const createPaymentIntent = async (amount, userId) => {
  const paymentIntent = await getStripe().paymentIntents.create({
    amount: Number(amount),
    currency: process.env.STRIPE_CURRENCY || "usd",
    payment_method_types: ["card"],
    metadata: {
      userId: userId.toString(),
    },
  });

  return paymentIntent.client_secret;
};

// 2 - Verify a PaymentIntent by fetching its status from Stripe
export const verifyPayment = async (paymentIntentId) => {
  const paymentIntent =
    await getStripe().paymentIntents.retrieve(paymentIntentId);

  return {
    isSucceeded: paymentIntent.status === "succeeded",
    status: paymentIntent.status,
    reference: paymentIntent.id,
  };
};

// 3 - Return the Stripe publishable key (safe to expose to the frontend)
export const getPublishableKey = () => {
  return process.env.STRIPE_PUBLIC_KEY;
};
