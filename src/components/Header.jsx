import { Link } from "react-router-dom";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  // const [login, setLogin] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // const handleLogin = () => setLogin(!login);

  return (
    <div className="sticky top-0 z-10 bg-white w-full flex flex-row justify-between items-center px-14  sm:px-[11%] text-base sm:text-xl py-3 sm:py-4 mb-4 border-b-2 gap-36 sm:gap-0">
      {/* Logo */}
      <div className="flex justify-center sm:justify-start items-center w-full sm:w-auto gap-2">
        <img
          className="h-[35px] sm:h-[40px]"
          src="https://cdn-icons-png.flaticon.com/512/2819/2819194.png"
          alt="twiggy logo"
        />
        <h1 className="text-orange-600 text-4xl font-bold italic">Twiggy</h1>
      </div>

      {/* Nav & Actions */}
      <div className="flex gap-5 sm:gap-6 items-center justify-center sm:justify-end w-full sm:w-auto">
        <div className="navlinks flex gap-4 relative">
          <Link to="/cart" className="font-bold relative">
            <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7" />
            {totalItems > 0 && (
              <span className="absolute -top-4 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* <div>
          <button
            className="min-w-20 sm:min-w-24 px-4 py-1 sm:p-2 bg-orange-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-orange-700 transition"
            onClick={handleLogin}
          >
            {login ? "Logout" : "Login"}
          </button>
        </div> */}
      </div>
    </div>
  );
}
