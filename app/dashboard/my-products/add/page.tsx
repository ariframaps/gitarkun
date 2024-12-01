"use client";

import { addProductSchema, AddProductType } from "@/models/AddProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
  });

  function onSubmit(data: AddProductType) {
    console.log(data);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="m-16 bg-green-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="image">upload image</label>
          <input type="file" id="image" {...register("image")} />
          <span className="text-red-500 text-sm">{errors.image?.message}</span>
        </div>
        <div>
          <label htmlFor="name">Product Title</label>
          <input type="text" id="name" {...register("name")} />
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="text" id="price" {...register("price")} />
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
        <button type="submit">add tab</button>
      </form>
    </section>
  );
};

export default page;
