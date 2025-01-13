"use client";

import { addProductSchema, AddProductType } from "@/models/AddProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
import { addProduct } from "@/utils/api";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductType } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, Loader2 } from "lucide-react";

const Page = () => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState<AddProductType>();
  const imageRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [disable, setDisable] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
  });
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

  async function handleAddProduct() {
    setDisable(true);
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
          // router.push("/dashboard/my-products");
          setTimeout(() => {
            window.location.replace("/dashboard/my-products");
          }, 100);
        }
      })
      .catch(() => {
        setDisable(false);
        return;
      });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="flex flex-col">
      <button
        className="w-max self-end border bg-neutral-50 shadow-md rounded-none flex gap-3 mb-7 items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        onClick={() => router.back()}>
        <ChevronLeftIcon width={20} />
        Back
      </button>
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
          <div className="flex gap-5">
            <div className="flex items-center">
              <input
                id="Movie Song"
                type="radio"
                value="Movie Song"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                {...register("category")}
              />
              <label
                htmlFor="Movie Song"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Movie Song
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("category")}
                id="Original Arrangement"
                type="radio"
                value="Original Arrangement"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="Original Arrangement"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Original Arrangement
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("category")}
                id="Classic"
                type="radio"
                value="Classic"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="Classic"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Classic
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("category")}
                id="Anime"
                type="radio"
                value="Anime"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="Anime"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Anime
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register("category")}
                id="Pop"
                type="radio"
                value="Pop"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="Pop"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Pop
              </label>
            </div>
          </div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.category?.message}
          </p>
        </div>
        <label
          htmlFor="difficulty"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Difficulty
        </label>
        <div className="flex gap-5">
          <div className="flex items-center">
            <input
              id="Beginner"
              type="radio"
              value="Beginner"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...register("difficulty")}
            />
            <label
              htmlFor="Beginner"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Beginner
            </label>
          </div>
          <div className="flex items-center">
            <input
              {...register("difficulty")}
              id="Intermediate"
              type="radio"
              value="Intermediate"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="Intermediate"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Intermediate
            </label>
          </div>
          <div>
            <input
              {...register("difficulty")}
              id="Advanced"
              type="radio"
              value="Advanced"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="Advanced"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Advanced
            </label>
          </div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.difficulty?.message}
          </p>
        </div>
        <div className="my-6">
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
          disabled={isLoading || disable}
          className="disabled:bg-neutral-400 mt-7 text-white bg-blue-700 flex items-center gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 md:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {disable && <Loader2 className="animate-spin" />}
          Submit
        </button>
      </form>
    </section>
  );
};

export default Page;
