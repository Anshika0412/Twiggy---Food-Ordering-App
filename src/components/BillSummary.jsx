// src/components/BillSummary.jsx
import { IndianRupee } from "lucide-react";

export default function BillSummary({ itemTotal, deliveryFee, platformFee, gstCharges, totalToPay, tip, setTip, cartItems, handleOrder }) {
  return (
    <div className="w-full md:w-1/3 h-auto md:h-96 flex flex-col gap-2 border-2 border-gray-300 text-gray-500 p-4  md:p-5 rounded-lg font-medium shadow-sm bg-white">
      <h1 className="text-black text-lg md:text-xl font-semibold mb-2 text-center md:text-left">Bill Summary</h1>

      {/* Item Total */}
      <div className="flex justify-between text-sm md:text-base">
        <h2>Item Total</h2>
        <div className="flex items-center text-black font-semibold">
          <IndianRupee className="h-[14px]" /> {itemTotal.toFixed(2)}
        </div>
      </div>

      {/* Delivery Fee */}
      <div className="flex justify-between text-sm md:text-base">
        <h2>Delivery Fee (fixed)</h2>
        <div className="flex items-center">
          <IndianRupee className="h-[14px]" /> {deliveryFee.toFixed(2)}
        </div>
      </div>

      <hr className="my-1" />

      {/* Delivery Tip */}
      <div className="flex justify-between items-center text-sm md:text-base">
        <h2>Delivery Tip</h2>
        <input
          type="number"
          value={tip}
          onChange={(e) => cartItems.length > 0 && setTip(e.target.value)}
          className="border border-gray-300 rounded-md p-1 w-16 md:w-20 text-center text-black"
          placeholder="0"
          min="0"
          disabled={cartItems.length === 0}
        />
      </div>

      {/* Platform Fee */}
      <div className="flex justify-between text-sm md:text-base">
        <h2>Platform Fee</h2>
        <div className="flex items-center">
          <IndianRupee className="h-[14px]" /> {platformFee.toFixed(2)}
        </div>
      </div>

      {/* GST */}
      <div className="flex justify-between text-sm md:text-base">
        <h2>GST and Restaurant Charges</h2>
        <div className="flex items-center">
          <IndianRupee className="h-[14px]" /> {gstCharges.toFixed(2)}
        </div>
      </div>

      <hr className="my-1" />

      {/* Final Total */}
      <div className="flex justify-between text-black font-bold text-sm md:text-base">
        <h2>To Pay</h2>
        <div className="flex items-center">
          <IndianRupee className="h-[14px]" /> {totalToPay.toFixed(2)}
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="bg-orange-600 rounded-lg p-2 w-full font-bold text-white my-2 hover:bg-orange-700 text-sm md:text-base transition-all duration-200"
      >
        Order
      </button>
    </div>
  );
}
