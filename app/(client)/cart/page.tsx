"use client";

import { useEffect, useState, useCallback } from "react";
import useStore from "@/store";
import { useAuth } from "@clerk/nextjs";
import { Address } from "@/sanity.types";
import { useUser } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import EmptyCart from "../../../components/EmptyCart";
import { ShoppingBag, Trash } from "lucide-react";
import Title from "@/components/Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { toast } from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddressFormDialog from "@/components/AddressFormDialog";
import { Pencil, Plus } from "lucide-react";
import { setDefaultAddress } from "@/actions/addresses";
import { Label } from "@/components/ui/label";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const fetchAddresses = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const query = `*[_type == "address" && clerkUserId == $userId] | order(createdAt desc)`;
      const data = await client.fetch<Address[]>(query, { userId: user.id });
      setAddresses(data ?? []);
      const defaultAddr = data?.find((a: Address) => a.default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (data?.length) {
        setSelectedAddress(data[0]);
      } else {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSetDefault = async (address: Address) => {
    if (address.default) return;
    const result = await setDefaultAddress(address._id);
    if (result.success) {
      toast.success("Default address updated!");
      fetchAddresses();
    } else {
      toast.error(result.error || "Failed to set default");
    }
  };
  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user?.id || "",
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md ">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-26 md:h-44">
                            {/* Product Image */}
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt={product?.name || ""}
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover 
                                  group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            {/* Product Name */}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                {/* Product Variant */}
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                {/* Product Status */}
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AddToWishlistButton
                                        product={product}
                                        className="relative top-0 right-0"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent
                                      sideOffset={1}
                                      className="text-xs bg-black text-white p-2 rounded-md "
                                    >
                                      Add to Wishlist
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success(
                                            "Product deleted successfully!"
                                          );
                                        }}
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent
                                      sideOffset={10}
                                      className="text-xs bg-red-600 text-white p-2 rounded-md"
                                    >
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="font-bold text-lg"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        {/* SubTotal */}
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        {/* Discount */}
                        <div className="flex items-center justify-between ">
                          <span>Discount</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                          />
                        </div>
                        <Separator />
                        {/* Total */}
                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className="text-lg font-bold text-black"
                          />
                        </div>
                        <Button
                          className="w-full rounded-full font-semibold tracking-wide hoverEffect bg-dark_blue text-white hover:bg-dark_blue/90"
                          size="lg"
                          disabled={loading || !selectedAddress}
                          onClick={handleCheckout}
                        >
                          {loading
                            ? "Please wait..."
                            : !selectedAddress
                              ? "Select an address"
                              : "Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="bg-white rounded-md mt-5">
                      <Card>
                        <CardHeader>
                          <CardTitle>Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {addresses.length === 0 ? (
                            <p className="text-sm text-muted-foreground mb-4">
                              No addresses yet. Add your first address to continue checkout.
                            </p>
                          ) : (
                            <RadioGroup
                              value={selectedAddress?._id.toString()}
                              onValueChange={(id) => {
                                const addr = addresses.find(
                                  (a) => a._id.toString() === id
                                );
                                if (addr) setSelectedAddress(addr);
                              }}
                              className="space-y-3"
                            >
                              {addresses.map((address) => (
                                <div
                                  key={address._id}
                                  className={`flex items-start gap-2 p-3 rounded-lg border transition-colors ${
                                    selectedAddress?._id === address._id
                                      ? "border-dark_blue bg-dark_blue/5"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={address._id.toString()}
                                    id={`address-${address._id}`}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={`address-${address._id}`}
                                    className="grid gap-1 flex-1 cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold">
                                        {address?.name}
                                      </span>
                                      {address?.default && (
                                        <span className="text-xs bg-dark_blue/10 text-dark_blue px-2 py-0.5 rounded">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-sm text-black/60">
                                      {address?.address}, {address?.city},{" "}
                                      {address?.state}, {address?.zip}
                                    </span>
                                    {!address?.default && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleSetDefault(address);
                                        }}
                                        className="text-xs text-dark_blue hover:underline w-fit"
                                      >
                                        Set as default
                                      </button>
                                    )}
                                  </Label>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0"
                                    onClick={() => {
                                      setEditingAddress(address);
                                      setAddressDialogOpen(true);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => {
                              setEditingAddress(null);
                              setAddressDialogOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Address
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    <AddressFormDialog
                      open={addressDialogOpen}
                      onOpenChange={setAddressDialogOpen}
                      address={editingAddress}
                      onSuccess={fetchAddresses}
                    />
                  </div>
                </div>
                {/* Order Summary for mobile */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                  <div className="bg-white p-4 rounded-lg border mx-4">
                    <h2>Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide hoverEffect bg-dark_blue text-white "
                        size="lg"
                        disabled={loading || !selectedAddress}
                        onClick={handleCheckout}
                      >
                        {loading
                          ? "Please wait..."
                          : !selectedAddress
                            ? "Select an address"
                            : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
