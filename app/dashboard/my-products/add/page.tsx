"use client";

import { addProductSchema, AddProductType } from "@/models/AddProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useAuth } from "@clerk/nextjs";
import { addProduct } from "@/lib/api";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductType } from "@/lib/types";
import { useRouter } from "next/navigation";

const page = () => {
  const { userId } = useAuth();

  const [formData, setFormData] = useState<AddProductType>();
  const imageRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: (addedProduct) => {
      queryClient.setQueryData(["my-product"], (oldProduct: ProductType[]) => [
        ...oldProduct,
        addedProduct,
      ]);
    },
  });

  useEffect(() => {
    if (formData) {
      handleAddProduct();
    }
  }, [formData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
  });

  async function handleAddProduct() {
    console.log(imageRef.current?.files[0], "image");
    console.log(formData, "formData");

    // imageRef saat saya console.log otu hasilnya adalah "C:\fakepath\pencil.png "
    const newImageFormData = new FormData();
    newImageFormData.append("image", imageRef.current?.files[0]);

    await axios
      .post(
        "https://api.imgbb.com/1/upload?key=6585372aa8dbf604c859353940b55919",
        newImageFormData
      )
      .then((res) => {
        const imageUrl = res.data.data.display_url;

        if (imageUrl && formData) {
          const newProduct = {
            ...formData,
            image: imageUrl,
            sellerId: userId,
            isDeleted: false,
          };

          mutate({ product: newProduct });
          router.push("/dashboard/my-products");
        }
      })
      .catch(() => {
        return;
      });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="">
      <form onSubmit={handleSubmit((data) => setFormData(data))}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Song Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.name?.message}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.price?.message}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <input
            type="text"
            {...register("category")}
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.category?.message}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="difficulty"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Difficulty
          </label>
          <input
            type="text"
            {...register("difficulty")}
            id="difficulty"
            placeholder="Beginner | Intermediate | Advanced"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.difficulty?.message}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.description?.message}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="link"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            PDF Tab Link
          </label>
          <input
            type="url"
            {...register("link")}
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.link?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image
          </label>{" "}
          <input ref={imageRef} type="file" name="image" />
        </div>
        <button
          type="submit"
          className=" mt-7 text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>
    </section>
  );
};

export default page;
