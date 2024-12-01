"use client";

import { addProductSchema, AddProductType } from "@/models/AddProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useAuth } from "@clerk/nextjs";
import { addProduct } from "@/lib/api";

const page = () => {
  const { userId } = useAuth();

  const [uploadResult, setUploadResult] = useState<string | undefined>();
  const [formData, setFormData] = useState<AddProductType>();

  useEffect(() => {
    if (uploadResult && formData) {
      handleAddProduct();
    }
  }, [uploadResult, formData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
  });

  async function handleAddProduct() {
    console.log(uploadResult, "uploadResult");
    console.log(formData, "formData");

    let product;
    if (uploadResult && formData) {
      product = {
        ...formData,
        image: uploadResult,
        sellerId: userId,
        isDeleted: false,
      };

      const response = await addProduct(product);
      console.log(response);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="m-16 bg-green-200">
      <form onSubmit={handleSubmit((data) => setFormData(data))}>
        <div>
          <label htmlFor="name">Product Title</label>
          <input type="text" id="name" {...register("name")} />
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            {...register("price", { valueAsNumber: true })}
          />
          <span className="text-red-500 text-sm">{errors.price?.message}</span>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" {...register("category")} />
          <span className="text-red-500 text-sm">
            {errors.category?.message}
          </span>
          {/* dropdown fix */}
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <input type="text" id="difficulty" {...register("difficulty")} />
          <span className="text-red-500 text-sm">
            {errors.difficulty?.message}
          </span>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" {...register("description")} />
          <span className="text-red-500 text-sm">
            {errors.description?.message}
          </span>
        </div>
        <div>
          <label htmlFor="link">link</label>
          <input type="text" id="link" {...register("link")} />
          <span className="text-red-500 text-sm">{errors.link?.message}</span>
        </div>
        <CldUploadWidget
          uploadPreset="next_gitarkun_webapp"
          onSuccess={({ event, info }) => {
            if (event === "success" && info && typeof info === "object") {
              setUploadResult(info.public_id);
            }
          }}>
          {({ open }) => {
            return (
              <button
                onClick={() => {
                  if (Object.keys(errors).length !== 0) {
                    return;
                  } else {
                    return open();
                  }
                }}>
                Next
              </button>
            );
          }}
        </CldUploadWidget>
      </form>
    </section>
  );
};

export default page;
