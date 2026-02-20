"use server";

import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { Address } from "@/sanity.types";
import { CartItem } from "@/store";
import { urlFor } from "@/sanity/lib/image";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  address: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (base?.startsWith("http://") || base?.startsWith("https://")) {
    return base.replace(/\/$/, "");
  }
  if (base) return `https://${base}`;
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    const baseUrl = getBaseUrl();
    //Retrieve existing customer or create new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
        address: JSON.stringify(metadata.address),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/cart`,
      line_items: items?.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round((item?.product?.price ?? 0) * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: item?.product?.description,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: item?.quantity,
      })),
    };
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.log("Error creating checkout session:", error);
    throw error;
  }
}
