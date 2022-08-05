/* eslint-disable @next/next/no-img-element */
import { IBusiness } from "../../types";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Category } from "./Category";
import { useState } from "react";
import { i18n } from "../../lib/labels";

export const Card = ({
  state,
  isFavorite = false,
  handleFavoritePressed,
}: {
  state: IBusiness;
  isFavorite?: boolean;
  handleFavoritePressed: () => void;
}) => {
  const [imgLoadFailed, setImageFailed] = useState(false);
  const isHighRating = state.rating > 3.5;

  return (
    <div className="flex flex-col relative items-center bg-white  sm:w-80 rounded shadow-md md:w-full ">
      <header className="relative w-full">
        <button
          onClick={handleFavoritePressed}
          className=" absolute z-10 bg-white rounded-full p-1 right-0 top-0"
        >
          {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
        <div className=" overflow-hidden w-full h-52">
          {imgLoadFailed ? (
            <div className=" h-full w-full bg-slate-300 animate-pulse" />
          ) : (
            <img
              src={state.photos?.[0]}
              className="  rounded-t-md"
              alt={state.name}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className="flex flex-col absolute bottom-0 left-0 right-0 p-1 bg-blue-600 text-white justify-center items-center">
          <label className=" text-base font-semibold leading-3">
            {state.price}
          </label>
          <label className=" text-xxs">{i18n.priceLevel}</label>
        </div>
      </header>
      <footer className="w-full flex flex-col">
        <label className=" text-sm text-center truncate w-44 mx-auto">
          {state.name}
        </label>
        <div className="flex justify-between py-3 px-4 border-b border-t">
          <div className="flex flex-col ">
            <label className=" text-xs text-gray-800">
              {state.location.address1}
            </label>
            <label className=" text-xxs text-gray-600">
              {state.location.city}, {state.location.country}
            </label>
          </div>
          <div
            className={` w-6 h-6 text-white text-xs flex items-center justify-center rounded ${
              isHighRating ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {state.rating}
          </div>
        </div>
        <div className="flex p-2 gap-2 ">
          {state.categories.map((cat) => (
            <Category key={cat.title} title={cat.title} />
          ))}
        </div>
      </footer>
    </div>
  );
};
