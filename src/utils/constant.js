// food fire APIs

export const API_BASE_URL = "https://foodfire.onrender.com";

// Swiggy API to get Restaurant data using foodfire server
export const FOODFIRE_API_URL = `${API_BASE_URL}/api/restaurants?lat=30.7213417&lng=76.7812596&page_type=DESKTOP_WEB_LISTING`;

// Swiggy API to get Restaurant Menu data using foodfire server
export const FOODFIRE_MENU_API_URL = `${API_BASE_URL}/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=`;


// original Swiggy API url 
 export const fetchURL =
     "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7213417&lng=76.7812596&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const MENU_URL = "https://corsproxy.io/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.7213417&lng=76.7812596&restaurantId="     
    