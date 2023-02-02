import AdminLayout from "@/components/Layout/AdminLayout";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { productEditReducer } from "@/utils/reducer";
import axios from "axios";
import { getError } from "@/utils/error";
import Loading from "@/components/Loading/Loading";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const router = useRouter();
  const productId = router.query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(productEditReducer, {
      loading: true,
      error: "",
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const data = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("image", data.image);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("countInStock", data.countInStock);
        setValue("description", data.description);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [productId, setValue]);

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign");
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);
      toast.success("File uploaded successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Product ${productId}`}>
      <AdminLayout>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">{`Product ${productId}`}</h1>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full"
                id="name"
                {...register("name", {
                  required: "Please enter name",
                })}
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                className="w-full"
                id="slug"
                {...register("slug", {
                  required: "Please enter slug",
                })}
              />
              {errors.slug && (
                <div className="text-red-400">{errors.slug.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="w-full"
                id="price"
                {...register("price", {
                  required: "Please enter price",
                })}
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="w-full"
                id="image"
                {...register("image", {
                  required: "Please enter image",
                })}
                disabled
              />
              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="imageFile">Upload image</label>
              <input
                type="file"
                className="w-full"
                id="imageFile"
                onChange={uploadHandler}
              />

              {loadingUpload && <div>Uploading....</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="w-full"
                id="category"
                {...register("category", {
                  required: "Please enter category",
                })}
              />
              {errors.category && (
                <div className="text-red-500">{errors.category.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="w-full"
                id="brand"
                {...register("brand", {
                  required: "Please enter brand",
                })}
              />
              {errors.brand && (
                <div className="text-red-500">{errors.brand.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                type="text"
                className="w-full"
                id="countInStock"
                {...register("countInStock", {
                  required: "Please enter countInStock",
                })}
              />
              {errors.countInStock && (
                <div className="text-red-500">
                  {errors.countInStock.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="w-full"
                id="description"
                {...register("description", {
                  required: "Please enter description",
                })}
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>
            <div className="mb-4 flex justify-between w-full ">
              <button disabled={loadingUpdate} className="primary-button">
                {loadingUpdate ? "Loading" : "Confirm"}
              </button>
              <Link
                className="border border-amber-500 py-2 px-4 shadow rounded-md"
                href="/admin/products"
              >
                Back
              </Link>
            </div>
          </form>
        )}
      </AdminLayout>
    </Layout>
  );
};

export default ProductEdit;
