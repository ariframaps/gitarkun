"use client";

import { addProductSchema, AddProductType } from "@/models/AddProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CldUploadButton,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { useAuth } from "@clerk/nextjs";
import { addProduct } from "@/lib/api";
import { useRouter } from "next/navigation";
// import {} from 'imgbb-uploader'

const page = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const [uploadResult, setUploadResult] = useState<string | undefined>();
  const [formData, setFormData] = useState<AddProductType>();

  const imageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (uploadResult && formData) {
      // handleAddProduct();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
  });

  async function handleAddProduct(e: FormData) {
    console.log(e, "formData");
    if (imageRef.current && imageRef.current.files) {
      const file = imageRef.current.files[0];
      if (file) {
        const formDataImg = new FormData();
        formDataImg.append("image", file);

        try {
          // Mengirim request POST ke ImgBB API
          const response = await fetch(
            "https://api.imgbb.com/1/upload?key=6585372aa8dbf604c859353940b55919",
            {
              method: "POST",
              body: JSON.stringify(formDataImg),
            }
          );
          console.log(response);
          // Mendapatkan URL gambar yang telah di-upload
          //   if (response) {
          //     // setUploadedImageURL(response.data.data.url);
          //     console.log("URL Gambar yang di-upload:", response.data.data.url);
          //   }
        } catch (error) {
          console.error("Error upload:", error);
        }
      }
    }
    return;
    let product;
    if (uploadResult && formData) {
      product = {
        ...formData,
        image: uploadResult,
        sellerId: userId,
        isDeleted: false,
      };

      await addProduct(product).then(
        (res) => console.log(res)
        // router.push("/dashboard/my-products")
      );
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="m-16 bg-green-200">
      <form>
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
        <div id="imgBb">
          <label htmlFor="link">link</label>
          <input type="text" id="link" {...register("link")} />
          <span className="text-red-500 text-sm">{errors.link?.message}</span>
        </div>
        <div>
          <input
            ref={imageRef}
            type="file"
            name="image"
            onChange={(e) => e.target.files}
          />
          <button type="submit">Upload</button>
        </div>
        <CldUploadWidget
          uploadPreset="next_gitarkun_webapp"
          onSuccess={({ event, info }) => {
            if (event === "success" && info && typeof info === "object") {
              setUploadResult(info.public_id);
              console.log(info.public_id);
              // return () => handleAddProduct();
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
