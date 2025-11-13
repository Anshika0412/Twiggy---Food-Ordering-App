import { useState, useEffect } from "react";
import { FOODFIRE_MENU_API_URL } from "./constant";

export default function useRestaurantInfo(resId) {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // const proxyServer = "https://cors-anywhere.herokuapp.com/";
        // const swiggyApi = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.7213417&lng=76.7812596&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER` 
        // const res = await fetch(proxyServer + swiggyApi + resId);
        const res = await fetch(FOODFIRE_MENU_API_URL + resId);
        const json = await res.json();
        console.log(json);

        // ✅ Get restaurant basic info
        const resInfo =
          json?.data?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info;
        setRestaurantInfo(resInfo);
        // console.log(resInfo);

        // ✅ Navigate to REGULAR menu section
        const regularCards =
          json?.data?.cards?.find(
            (c) => c?.groupedCard?.cardGroupMap?.REGULAR
          )?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        const menuCategories = regularCards.filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

        setMenuCategories(menuCategories);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    if (resId) fetchMenu();
  }, [resId]);

  return { restaurantInfo, menuCategories };
}
