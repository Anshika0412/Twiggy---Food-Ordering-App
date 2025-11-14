
export default function Shimmer() {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pr-3">
      {Array(12).fill("").map((_, index) => (
        <div
          key={index}
          className="h-[250px] w-full p-1 m-1 rounded-lg shadow animate-pulse bg-white"
        >
          {/* Image placeholder */}
          <div className="h-[60%] w-full bg-gray-300 rounded-xl"></div>

          {/* Text placeholders */}
          <div className="pl-4 mt-2 space-y-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

            <div className="flex gap-4">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>

            <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}


// export default function Shimmer() {
//   return (
//     <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
//       {Array(12)
//         .fill("")
//         .map((_, i) => (
//           <div
//             key={i}
//             className="h-[230px] sm:h-[250px] w-[160px] sm:w-[220px] p-1 m-2 sm:m-4 animate-pulse bg-gray-100 rounded-xl"
//           >
//             <div className="h-[55%] sm:h-[60%] w-full bg-gray-300 rounded-xl"></div>
//             <div className="pl-2 sm:pl-4 mt-2">
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
//               <div className="h-3 bg-gray-200 rounded w-2/3 mb-1"></div>
//               <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

