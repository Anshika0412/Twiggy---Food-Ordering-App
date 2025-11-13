import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, addItem, removeItem } from '../store/slices/cartSlice'
import { IndianRupee } from 'lucide-react'
import BillSummary from './BillSummary'

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.cart.items)

  const [tip, setTip] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // ✅ Calculate bill dynamically using useMemo
  const { itemTotal, deliveryFee, platformFee, gstCharges, totalToPay } = useMemo(() => {
    const itemTotal = cartItems.reduce((sum, item) => {
      const price = (item.price || item.defaultPrice || 0) / 100
      return sum + price * item.qty
    }, 0)

    const deliveryFee = cartItems.length > 0 ? 50 : 0
    const platformFee = cartItems.length > 0 ? 10 : 0
    const gstCharges = itemTotal * 0.05
    const totalToPay = itemTotal + deliveryFee + platformFee + gstCharges + Number(tip)

    return { itemTotal, deliveryFee, platformFee, gstCharges, totalToPay }
  }, [cartItems, tip])

  const handleClearCart = () => {
    dispatch(clearCart())
    setTip(0)
  }

  const handleOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
      handleClearCart()
    }, 1000)
  }

  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto text-center px-4 md:px-8 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between my-6 md:my-8 gap-3">
        <h1 className="text-3xl md:text-4xl font-bold">Cart</h1>
        <button
          onClick={handleClearCart}
          className="p-2 px-4 font-bold bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm md:text-base"
        >
          Clear Cart
        </button>
      </div>

      {/* Main layout */}
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 justify-between">
        {/* 🛒 Cart Items */}
        <div className="border-2 border-gray-300 p-3 md:p-4 flex flex-col rounded-lg min-h-64 md:min-h-96 w-full md:w-2/3">
          {cartItems.length === 0 ? (
            <h1 className="font-semibold text-center my-auto text-xl md:text-2xl">
              No items in Cart.
            </h1>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 border-b border-gray-300 text-sm md:text-base"
              >
                <img
                  className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-xl object-cover"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                  alt={item.name}
                />
                <div className="text-left flex-1 ml-3 md:ml-4">
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="flex items-center text-gray-700">
                    <IndianRupee className="h-[14px]" /> {(item.price || item.defaultPrice) / 100} × {item.qty}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-black rounded-lg px-2 py-1 md:px-3">
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-orange-500 font-bold text-lg px-1 md:px-2"
                  >
                    –
                  </button>
                  <span className="px-1 md:px-2 font-semibold">{item.qty}</span>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="text-green-500 font-bold text-lg px-1 md:px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 💰 Bill Summary */}
        <BillSummary
          itemTotal={itemTotal}
          deliveryFee={deliveryFee}
          platformFee={platformFee}
          gstCharges={gstCharges}
          totalToPay={totalToPay}
          tip={tip}
          setTip={setTip}
          cartItems={cartItems}
          handleOrder={handleOrder}
        />
      </div>

      {/* ✅ Success message overlay */}
      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="h-28 md:h-32 w-4/5 md:w-1/3 px-4 md:px-6 flex flex-col items-center justify-center bg-white text-orange-600 text-xl md:text-2xl font-semibold border-2 border-orange-400 rounded-xl shadow-lg text-center">
            {cartItems.length > 0 ? <h2>Order placed successfully!</h2> : <h2>Cart is empty!</h2>}
          </div>
        </div>
      )}
    </div>
  )
}
