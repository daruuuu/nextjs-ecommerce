import CheckoutWizard from "@/components/CheckoutWizard/CheckoutWizard";
import Layout from "@/components/Layout/Layout";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Please select a payment method");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
    );
    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title={"Payment Method"}>
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["Paypal", "Stripe", "Cash"].map((paymentMethod) => (
          <div key={paymentMethod} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={paymentMethod}
              type="radio"
              checked={selectedPaymentMethod === paymentMethod}
              onChange={() => setSelectedPaymentMethod(paymentMethod)}
            />
            <label htmlFor={paymentMethod} className="p-2">
              {paymentMethod}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            type="button"
            className="default-button"
            onClick={() => router.push("/shipping")}
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

Payment.auth = true;

export default Payment;
