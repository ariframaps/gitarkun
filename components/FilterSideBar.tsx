import { useFilter } from "@/provider/context/filterContext";
import { FilterIcon } from "lucide-react";
import React, { useState } from "react";

const FilterSideBar = () => {
  const { state, difficultyDispatch, priceDispatch, clearDispatch } =
    useFilter();

  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowFilter(!showFilter)}
        type="button"
        className="order-1 inline-flex items-center p-1 text-sm text-gray-500 sm:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <FilterIcon />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed z-999 sm:absolute lg:top-64 w-64 md:h-max h-screen pb-10 transition-transform sm:translate-x-0 ${
          showFilter ? "" : "-translate-x-full"
        }`}>
        <div className="h-full px-3 py-4 overflow-y-auto order bg-white sm:bg-[#17813C] sm:text-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="ms-3 flex flex-col gap-10">
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FilterIcon color="white" />
                <span className="ms-3 text-xl text-white">Filter & Sort</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mb-2">Price</p>
                <div>
                  <input
                    onChange={(e) => priceDispatch(e.target.value)}
                    checked={state.priceFilter === "lowToHigh"}
                    value="lowToHigh"
                    type="radio"
                    name="price"
                    id="price_lowToHigh"
                    className="me-3 w-4 h-4"
                  />
                  <label htmlFor="price_lowToHigh">Price - Low to High</label>
                </div>
                <div>
                  <input
                    onChange={(e) => priceDispatch(e.target.value)}
                    checked={state.priceFilter === "highToLow"}
                    value="highToLow"
                    type="radio"
                    name="price"
                    id="price_highToLow"
                    className="me-3 w-4 h-4"
                  />
                  <label htmlFor="price_highToLow">Price - High to Low</label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mb-2">Difficulty</p>
                <div>
                  <input
                    onChange={(e) => difficultyDispatch(e.target.value)}
                    checked={state.difficultyFilter === "Beginner"}
                    value="Beginner"
                    type="radio"
                    name="difficulties"
                    id="beginner"
                    className="me-3 w-4 h-4"
                  />
                  <label htmlFor="beginner">Beginner</label>
                </div>
                <div>
                  <input
                    onChange={(e) => difficultyDispatch(e.target.value)}
                    checked={state.difficultyFilter === "Intermediate"}
                    value="Intermediate"
                    type="radio"
                    name="difficulties"
                    id="intermediate"
                    className="me-3 w-4 h-4"
                  />
                  <label htmlFor="intermediate">Intermediate</label>
                </div>
                <div>
                  <input
                    onChange={(e) => difficultyDispatch(e.target.value)}
                    checked={state.difficultyFilter === "Advanced"}
                    value="Advanced"
                    type="radio"
                    name="difficulties"
                    id="advanced"
                    className="me-3 w-4 h-4"
                  />
                  <label htmlFor="advanced">Advanced</label>
                </div>
              </div>
              <button
                onClick={() => clearDispatch()}
                className=" bg-yellow-400 text-black hover:bg-yellow-600 text-center flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Clear
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default FilterSideBar;
