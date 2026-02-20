"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createAddress,
  updateAddress,
  AddressFormData,
} from "@/actions/addresses";
import { Address } from "@/sanity.types";
import { toast } from "react-hot-toast";

interface AddressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address?: Address | null;
  onSuccess: () => void;
}

const initialFormData: AddressFormData = {
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  email: "",
};

export default function AddressFormDialog({
  open,
  onOpenChange,
  address,
  onSuccess,
}: AddressFormDialogProps) {
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const isEditing = !!address?._id;

  useEffect(() => {
    if (open) {
      if (address) {
        setFormData({
          name: address.name ?? "",
          address: address.address ?? "",
          city: address.city ?? "",
          state: address.state ?? "",
          zip: address.zip ?? "",
          email: address.email ?? "",
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [open, address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: AddressFormData = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip: formData.zip.trim(),
        email: formData.email?.trim() || undefined,
      };

      if (!data.name || !data.address || !data.city || !data.state || !data.zip) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (isEditing && address?._id) {
        const result = await updateAddress(address._id, data);
        if (result.success) {
          toast.success("Address updated successfully!");
          onSuccess();
          onOpenChange(false);
        } else {
          toast.error(result.error || "Failed to update address");
        }
      } else {
        const result = await createAddress(data);
        if (result.success) {
          toast.success(
            result.address?.default
              ? "Address added as your default!"
              : "Address added successfully!"
          );
          onSuccess();
          onOpenChange(false);
        } else {
          toast.error(result.error || "Failed to add address");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Address Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Home, Work"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="Street, apartment, unit..."
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Optional"
              value={formData.email ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="state">State / Province *</Label>
              <Input
                id="state"
                placeholder="e.g. NY, California"
                value={formData.state}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="zip">ZIP / Postal Code *</Label>
            <Input
              id="zip"
              placeholder="e.g. 12345"
              value={formData.zip}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Save" : "Add Address"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
