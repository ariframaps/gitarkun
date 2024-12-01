import React from "react";

const FilterSideBar = () => {
  //   const {
  //     state,
  //     bestSellerDispatch,
  //     inStockDispatch,
  //     ratingDispatch,
  //     priceDispatch,
  //     clearDispatch,
  //   } = useFilter();

  return (
    <div className="me-5">
      <h1>Filter & Sort</h1>
      <div>
        <div className="text-lg">
          <span className="font-semibold text-lg">Sort by</span>
          <div>
            <input
              //   onChange={(e) => priceDispatch(e.target.value)}
              //   checked={state.priceFilter === "lowToHigh"}
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
              //   onChange={(e) => priceDispatch(e.target.value)}
              //   checked={state.priceFilter === "highToLow"}
              value="highToLow"
              type="radio"
              name="price"
              id="price_highToLow"
              className="me-3 w-4 h-4"
            />
            <label htmlFor="price_highToLow">Price - High to Low</label>
          </div>

          <div className="text-lg">
            <span className="font-semibold text-lg">Difficulty</span>
            <div>
              <input
                // onChange={(e) => ratingDispatch(e.target.value)}
                // checked={state.ratingFilter === "stars_4"}
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
                // onChange={(e) => ratingDispatch(e.target.value)}
                // checked={state.ratingFilter === "stars_3"}
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
                // onChange={(e) => ratingDispatch(e.target.value)}
                // checked={state.ratingFilter === "stars_2"}
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
            // onClick={() => clearDispatch()}
            className="w-full border py-3 bg-slate-200 hover:bg-slate-300 font-bold">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
