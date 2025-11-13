
export default function RestraurantCard({ restaurant }) {
  const { name, cloudinaryImageId, areaName, cuisines, avgRating, sla } = restaurant.info;

  return (
    <div className="h-[230px] sm:h-[250px] w-[170px] sm:w-[220px] p-1 m-2 sm:m-4 text-sm sm:text-lg cursor-pointer transition-transform hover:scale-[1.02]">
      <div className="relative h-[55%] sm:h-[60%] w-full rounded-xl overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`}
          alt={name}
        />
        {/* black inner shadow at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="pl-2 sm:pl-4">
        <h2 className="font-bold pt-2 truncate text-[15px] sm:text-base">{name}</h2>
        <div className="flex gap-3 sm:gap-4">
          <p className="text-[14px] sm:text-base">⭐ {avgRating}</p>
          <p className="font-semibold text-[14px] sm:text-base">{sla?.slaString}</p>
        </div>
        <p className="text-[13px] sm:text-base text-gray-500 truncate">{cuisines.join(", ")}</p>
        <p className="text-[13px] sm:text-base text-gray-500">{areaName}</p>
      </div>
    </div>
  );
}

export const withOfferLabel = (RestraurantCard) => {
  return (props) => {
    const { restaurant } = props;
    const offer = restaurant?.info?.aggregatedDiscountInfoV3;
    const header = offer?.header;
    const subHeader = offer?.subHeader;

    const fullOfferText =
      header && subHeader ? `${header} ${subHeader}` : header || "";

    return (
      <div className="relative">
        {/* Offer Label */}
        <label className="absolute z-10 top-[100px] sm:top-[115px] left-5 sm:left-9 text-white font-bold text-sm sm:text-lg drop-shadow-md">
          {fullOfferText}
        </label>

        {/* Render the original card */}
        <RestraurantCard {...props} />
      </div>
    );
  };
};
