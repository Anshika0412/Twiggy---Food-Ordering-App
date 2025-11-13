import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import ResMenuItem from "./ResMenuItem";

export default function ResMenuCategory({ category, showItems, setShowIndex }) {
  return (
    <div key={category.title} className="border-b-[10px] sm:border-b-[15px] border-gray-200 py-3 sm:py-4">
      <div
        className="flex justify-between items-center cursor-pointer px-1 sm:px-0"
        onClick={() => setShowIndex()}
      >
        <h2 className="text-base sm:text-xl font-semibold flex-1 break-words">
          {category.title} ({category.itemCards.length})
        </h2>
        {showItems ? (
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </div>

      {showItems && (
        <div className="space-y-2 mt-2 sm:mt-3 px-1 sm:px-0">
          {category.itemCards?.map((i) => (
            <ResMenuItem key={i.card.info.name} item={i.card.info} />
          ))}
        </div>
      )}
    </div>
  );
}
