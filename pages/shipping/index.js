import CheckoutWizard from "@/components/CheckoutWizard/CheckoutWizard";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Store } from "@/utils/Store";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";

const Shipping = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { cart } = state;
  const { shippingAddress } = cart;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
    setValue("phone", shippingAddress.phone);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
    phone,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        phone,
      },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
          phone,
        },
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Full Name is required",
            })}
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register("address", {
              required: "Address is required",
              minLength: { value: 3, message: "Address is too short" },
            })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            autoFocus
            {...register("postalCode", {
              required: "Postal Code is required",
            })}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full"
            id="country"
            autoFocus
            {...register("country", {
              required: "Country is required",
            })}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone">Phone</label>
          <input
            className="w-full"
            id="phone"
            autoFocus
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 10, message: "Phone is too short" },
            })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

Shipping.auth = true;

export default Shipping;
