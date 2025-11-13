import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import ResMenuCategory from "./ResMenuCategory";

export default function RestaurantMenu() {
  const [showIndex, setShowIndex] = useState(0);
  const [searchDish, setSearchDish] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const { resId } = useParams();
  const { restaurantInfo, menuCategories } = useRestaurantInfo(resId);

  const handleChange = (e) => setSearchDish(e.target.value);

  // ✅ filter logic applied before rendering categories
  const filteredCategories = menuCategories
    .map((category) => {
      const itemCards = category?.card?.card?.itemCards || [];
      const filteredItems = itemCards.filter((item) => {
        const itemName = item?.card?.info?.name?.toLowerCase() || "";
        const matchesSearch = itemName.includes(searchDish.toLowerCase());
        const matchesVeg = !isVeg || item?.card?.info?.isVeg === 1;
        return matchesSearch && matchesVeg;
      });
      return {
        ...category,
        card: {
          ...category.card,
          card: { ...category.card.card, itemCards: filteredItems },
        },
      };
    })
    .filter((category) => category?.card?.card?.itemCards?.length > 0);

  return (
    <div className="w-[90vw] sm:w-[80vw] md:w-[60vw] mx-auto my-6 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 text-center md:text-left">
        {restaurantInfo?.name}
      </h2>

      {/* 🏠 Restaurant Header */}
      <div className="relative my-6 p-[12px] sm:p-[15px] rounded-3xl bg-gradient-to-t from-gray-300 from-15% via-gray-200 via-30% to-transparent">
        <div className="flex flex-row gap-4 sm:gap-6 border border-gray-400 rounded-2xl p-4 bg-white">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-lg  sm:mx-0"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurantInfo?.cloudinaryImageId}`}
            alt={restaurantInfo?.name}
          />
          <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 font-bold text-base sm:text-lg justify-center sm:justify-start">
              <p>⭐ {restaurantInfo?.avgRating} ({restaurantInfo?.totalRatingsString})</p>
              <p>{restaurantInfo?.costForTwoMessage}</p>
            </div>
            <p className="text-orange-600 font-semibold text-sm sm:text-base">
              {restaurantInfo?.cuisines.join(", ")}
            </p>
            <p className="text-xs sm:text-sm font-bold">{restaurantInfo?.sla?.slaString}</p>
          </div>
        </div>
      </div>

      <h2 className="text-center my-4 tracking-widest font-semibold text-gray-600 text-sm sm:text-base">
        ~ MENU ~
      </h2>

      {/* 🔍 Search Dish */}
      <input
        className="w-full bg-gray-200 rounded-2xl text-center py-3 cursor-pointer text-sm sm:text-base"
        type="text"
        onChange={handleChange}
        value={searchDish}
        placeholder="🔍︎ Search for dishes"
      />

      {/* 🥦 Veg Filter */}
      <div className="flex gap-2 my-4 font-semibold text-base sm:text-lg items-center justify-center sm:justify-start">
        <input
          type="checkbox"
          checked={isVeg}
          id="isVeg"
          onChange={() => setIsVeg(!isVeg)}
          className="cursor-pointer h-4 w-4 sm:h-5 sm:w-5"
        />
        <label htmlFor="isVeg" className="cursor-pointer">Veg</label>
      </div>

      {/* 🍽️ Menu container */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((data, index) => (
          <ResMenuCategory
            key={data?.card?.card?.title}
            category={data?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10 text-sm sm:text-base">
          No dishes found.
        </p>
      )}
    </div>
  );
}
