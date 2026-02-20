"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { auth } from "@clerk/nextjs/server";

export interface AddressFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email?: string;
}

export async function createAddress(data: AddressFormData) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const existingAddresses = await backendClient.fetch<{ _id: string }[]>(
      `*[_type == "address" && clerkUserId == $userId]{_id}`,
      { userId }
    );

    const isFirstAddress = existingAddresses.length === 0;

    const doc = await backendClient.create({
      _type: "address",
      clerkUserId: userId,
      name: data.name,
      email: data.email || undefined,
      address: data.address,
      city: data.city,
      state: data.state.trim(),
      zip: data.zip,
      default: isFirstAddress,
      createdAt: new Date().toISOString(),
    });

    return { success: true, address: doc };
  } catch (error) {
    console.error("Error creating address:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create address",
    };
  }
}

export async function updateAddress(addressId: string, data: AddressFormData) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const existing = await backendClient.fetch<{ clerkUserId: string } | null>(
    `*[_id == $id][0]{clerkUserId}`,
    { id: addressId }
  );
  if (!existing || existing.clerkUserId !== userId) {
    return { success: false, error: "Address not found or access denied" };
  }

  try {
    const updated = await backendClient
      .patch(addressId)
      .set({
        name: data.name,
        email: data.email || undefined,
        address: data.address,
        city: data.city,
        state: data.state.trim(),
        zip: data.zip,
      })
      .commit();

    return { success: true, address: updated };
  } catch (error) {
    console.error("Error updating address:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update address",
    };
  }
}

export async function setDefaultAddress(addressId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const existing = await backendClient.fetch<{ clerkUserId: string } | null>(
    `*[_id == $id][0]{clerkUserId}`,
    { id: addressId }
  );
  if (!existing || existing.clerkUserId !== userId) {
    return { success: false, error: "Address not found or access denied" };
  }

  try {
    const addresses = await backendClient.fetch<{ _id: string }[]>(
      `*[_type == "address" && clerkUserId == $userId]{_id}`,
      { userId }
    );

    const transaction = backendClient.transaction();

    for (const addr of addresses) {
      transaction.patch(addr._id, (p) =>
        p.set({ default: addr._id === addressId })
      );
    }

    await transaction.commit();
    return { success: true };
  } catch (error) {
    console.error("Error setting default address:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to set default address",
    };
  }
}
