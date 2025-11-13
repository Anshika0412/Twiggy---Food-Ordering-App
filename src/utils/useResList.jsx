import { useState, useEffect,useCallback } from 'react';
import { FOODFIRE_API_URL } from "../utils/constant";

export default function useResList() {
  const [resList, setResList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextOffset, setNextOffset] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // 🚀 Initial Fetch
  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        // const proxyServer = "https://cors-anywhere.herokuapp.com/"
        // const swiggyApi = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7213417&lng=76.7812596&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        const res = await fetch(FOODFIRE_API_URL);
        const json = await res.json();
        console.log(json);

        const restro =
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        const offset = json?.data?.pageOffset?.nextOffset;

        setResList(restro || []);
        setFilteredList(restro || []);
        setNextOffset(offset);
      } catch (err) {
        console.log("Initial fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  // 🚀 Fetch more restaurants (pagination)
  const loadMore = useCallback(async () => {
    if (isFetchingMore || !nextOffset) return;

    try {
        setIsFetchingMore(true);
     
        // const proxyServer = "https://cors-anywhere.herokuapp.com/"
        // const swiggyApi = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7213417&lng=76.7812596&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        const res = await fetch(`${FOODFIRE_API_URL}&nextOffset=${nextOffset}&page_type=DESKTOP_WEB_LISTING`);

        if (!res.ok) {
        console.warn("⚠️ API returned error status:", res.status);
        setNextOffset(null);
        return;
        }

        let json;
        try {
        json = await res.json();
        } catch {
        console.error("⚠️ Response was not JSON — probably an HTML error page.");
        setNextOffset(null);
        return;
        }

        // const json = await res.json();

        const cards = json?.data?.cards || [];
        const found = cards.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        const moreRes = found?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        const newOffset = json?.data?.pageOffset?.nextOffset;

        if (moreRes.length > 0) {
            setResList((prev) => {
                const existingIds = new Set(prev.map((r) => r.info.id));
                const uniqueNew = moreRes.filter((r) => !existingIds.has(r.info.id));
                return [...prev, ...uniqueNew];
            });

            setFilteredList((prev) => {
                const existingIds = new Set(prev.map((r) => r.info.id));
                const uniqueNew = moreRes.filter((r) => !existingIds.has(r.info.id));
                return [...prev, ...uniqueNew];
            });
        }


        setNextOffset(newOffset || null);
    } catch (err) {
        console.log("Fetch more error:", err);
    } finally {
        setIsFetchingMore(false);
    }
    },[isFetchingMore, nextOffset] );

    //  return {resList,filteredList,setFilteredList,loading}; 
  return { resList, filteredList, setFilteredList, loading, loadMore, nextOffset, isFetchingMore };
}



// import {useState, useEffect} from 'react';
// import { fetchURL } from "../utils/constant";


// export default function useResList() {
//     const [resList, setResList] = useState([]);
//     const [filteredList, setFilteredList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [nextOffset, setNextOffset] = useState(null);
//     const [isFetchingMore, setIsFetchingMore] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true); // start loading
//                 const data = await fetch(fetchURL);
//                 const jsonData = await data.json();

//                 const restro = jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
//                 console.log(restro);
//                 const offset = jsonData?.data?.pageOffset?.nextOffset;
//                 console.log(`offset is ${offset}`);

//                 setResList(restro || []);
//                 setFilteredList(restro || []);
//                 setNextOffset(offset);   
//             } 
//             catch (err) {
//                 console.log(err);
//             } 
//             finally {
//                 setLoading(false); // stop loading
//             }
//         };
//         fetchData();
//         }, []);

//   return {resList,filteredList,setFilteredList,loading};
// }
