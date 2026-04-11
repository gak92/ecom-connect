import Stripe from "stripe";

// ── Lazy initialization ───────────────────────────────────────────────────────
// We CANNOT create new Stripe() at the top level because this module is
// evaluated before dotenv.config() runs (ESM import hoisting).
// Solution: create the instance on first use via getStripe().
// ─────────────────────────────────────────────────────────────────────────────

let _stripe = null;

export const getStripe = () => {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to backend/config/config.env",
      );
    }
    _stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  }
  return _stripe;
};
