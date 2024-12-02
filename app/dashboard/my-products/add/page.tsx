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
          router.push("/dashboard/my-product");
        }
      })
      .catch(() => {
        return;
      });
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
        <div>
          <input ref={imageRef} type="file" name="image" />
        </div>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};

export default page;
