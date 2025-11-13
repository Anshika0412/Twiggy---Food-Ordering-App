import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/slices/cartSlice";
import { IndianRupee, SquareDot, Star } from "lucide-react";

export default function MenuItem({ item }) {
  const [isDesExpanded, setIsDesExpanded] = useState(false);
  const { isVeg, name, description, price, defaultPrice, ratings, imageId, id } = item;

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const cartItem = cartItems.find((cartItem) => cartItem.id === id);

  const handleAddItem = () => dispatch(addItem(item));
  const handleRemoveItem = () => dispatch(removeItem(id));

  return (
    <div className="min-h-[120px] grid grid-cols-[1fr_auto] gap-4 sm:gap-6 items-start border-b border-gray-300 text-gray-600 py-4 mt-2">
      {/* Left column */}
      <div>
        {isVeg ? (
          <p className="text-green-500"><SquareDot /></p>
        ) : (
          <p className="text-red-500"><SquareDot /></p>
        )}

        <h2 className="text-base sm:text-lg font-bold text-black">{name}</h2>

        {/* Price */}
        <div className="flex text-[15px] sm:text-[16px] items-center font-semibold">
          <IndianRupee className="h-[14px] text-black" />
          <p>{(defaultPrice || price) / 100}</p>
        </div>

        {/* Rating */}
        {ratings?.aggregatedRating?.rating && (
          <div className="flex items-center text-sm font-bold my-2 sm:my-3">
            <Star className="h-[13px] sm:h-[14px] fill-green-800" />
            <p className="text-green-800 ml-1">{ratings.aggregatedRating.rating}</p>
            <p className="text-gray-500 ml-1">({ratings.aggregatedRating.ratingCountV2})</p>
          </div>
        )}

        {/* Description */}
        {isDesExpanded ? (
          <p className="text-sm sm:text-base text-gray-600">{description}</p>
        ) : (
          <div className="flex gap-1 items-end">
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{description}</p>
            {description && description.length > 150 && (
              <p
                onClick={() => setIsDesExpanded(true)}
                className="font-bold cursor-pointer"
              >
                more
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right column */}
      <div className="flex flex-col items-center sm:items-end sm:justify-start mt-3 sm:mt-0">
        <img
          className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-xl object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
          alt={name}
        />

        {cartItem ? (
          <div className="relative bottom-4 sm:bottom-6 flex items-center justify-between border border-black bg-white rounded-lg px-3 sm:px-4 py-1 w-[90px] sm:w-[100px]">
            <button
              onClick={handleRemoveItem}
              className="text-red-500 font-bold text-lg"
            >
              –
            </button>
            <span className="font-semibold text-black">{cartItem.qty}</span>
            <button
              onClick={handleAddItem}
              className="text-green-500 font-bold text-lg"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddItem}
            className="relative bottom-4 sm:bottom-6 left-[2px] min-w-[42px] border border-black px-6 sm:px-8 py-1 bg-white text-green-600 text-base sm:text-lg font-bold rounded-lg hover:bg-gray-200 transition"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
}
