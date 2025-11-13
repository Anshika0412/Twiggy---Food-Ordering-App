import { useEffect, useState, useRef } from "react";
import RestraurantCard, { withOfferLabel } from "../components/RestraurantCard";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import useResList from "../utils/useResList";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const {
    resList,
    filteredList,
    setFilteredList,
    loading,
    loadMore,
    isFetchingMore,
    nextOffset,
  } = useResList();

  const loaderRef = useRef(null);

  // 🚀 Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextOffset && !isFetchingMore) {
          observer.unobserve(loaderRef.current);
          loadMore().then(() => {
            if (loaderRef.current) observer.observe(loaderRef.current);
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextOffset, isFetchingMore]);

  // 🚀 Top Rated filter
  const handleTopRated = () => {
    const topRated = resList.filter((r) => r.info.avgRating >= 4.5);
    setFilteredList(topRated);
  };

  // 🚀 Live search (runs every time searchText changes)
  useEffect(() => {
    if (!searchText) {
      setFilteredList(resList);
    } else {
      const searched = resList.filter((r) =>
        r.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(searched);
    }
  }, [searchText, resList]);

  // 🚀 Search filter
  const handleSearch = () => {
    const searched = resList.filter((r) =>
      r.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    searched ? setFilteredList(searched) : setFilteredList(["We are Sorry"]);
  };

  // 🚀 Reset filters
  const handleReset = () => {
    setFilteredList(resList);
    setSearchText("");
  };

  // HOF for offer label
  const RestaurantCardOfferLabeled = withOfferLabel(RestraurantCard);

  return (
    <div className="p-3 sm:p-4 w-full sm:px-[10%]">
      {/* 🔍 Filter and Search Section */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 sm:gap-14 items-center sm:items-start mx-4  my-4">
        <button
          onClick={handleTopRated}
          className="bg-orange-600 text-white sm:px-3 py-2 rounded-xl text-sm sm:text-base font-medium w-full sm:w-auto"
        >
          Top Rated Restaurants
        </button>

        <div className="flex flex-row gap-2 w-full sm:w-auto">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="border-2 rounded-xl px-2 py-1 text-sm sm:text-base w-full sm:w-60"
            type="text"
            placeholder="Search restaurants..."
          />
          <div className="flex gap-2 justify-center sm:justify-start">
            <button
              onClick={handleSearch}
              className="bg-orange-600 px-4 py-2 rounded-xl font-medium text-white text-sm sm:text-base"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-400 text-white px-4 py-2 rounded-xl font-medium text-sm sm:text-base"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 🍴 Restaurant Grid */}
      {loading ? (
        <Shimmer />
      ) : filteredList.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500 my-32">
          We are Sorry 😔 No restaurants found.
        </p>
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-10 justify-items-center">
          {filteredList.map((r) => (
            <Link key={r.info.id} to={`/restaurant/${r.info.id}`}>
              {r.info.aggregatedDiscountInfoV3?.header ? (
                <RestaurantCardOfferLabeled restaurant={r} />
              ) : (
                <RestraurantCard restaurant={r} />
              )}
            </Link>
          ))}
        </div>
      )}

      {/* 🔄 Infinite Scroll Loader */}
      <div ref={loaderRef} style={{ height: "50px" }}></div>
      {isFetchingMore && (
        <p className="text-center text-gray-500 mb-10">Loading more...</p>
      )}
    </div>
  );
}
