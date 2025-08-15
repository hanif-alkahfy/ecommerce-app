import React from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ isDropdown = false, onClose }) => {
  const navigate = useNavigate();

  // Data cart (contoh - nanti akan diganti dengan state management/API)
  const cartItems = [
    {
      id: 1,
      name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
      price: 1499,
      quantity: 2,
      image: {
        light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
        dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
      },
    },
    {
      id: 2,
      name: "Apple Watch Series 8 GPS 41mm",
      price: 598,
      quantity: 1,
      image: {
        light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
        dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg",
      },
    },
  ];

  const handleQuantityChange = (id, newQuantity) => {
    // Implementasi perubahan quantity
    console.log("Change quantity:", id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    // Implementasi remove item
    console.log("Remove item:", id);
  };

  const handleAddToFavorites = (id) => {
    // Implementasi add to favorites
    console.log("Add to favorites:", id);
  };

  // Hitung total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 99;
  const savings = 299;
  const total = subtotal + tax + shipping - savings;

  const CartContent = () => (
    <>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                <img className="h-20 w-20 dark:hidden" src={item.image.light} alt={item.name} />
                <img className="hidden h-20 w-20 dark:block" src={item.image.dark} alt={item.name} />
              </a>

              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    <svg className="h-3 w-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" value={item.quantity} readOnly />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    <svg className="h-3 w-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="ml-4 text-end md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">${item.price * item.quantity}</p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                  {item.name}
                </a>

                <div className="flex items-center gap-4">
                  <button onClick={() => handleAddToFavorites(item.id)} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Favorites
                  </button>

                  <button onClick={() => handleRemoveItem(item.id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isDropdown && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{/* Recommendations here */}</div>
        </div>
      )}

      <div className={`${isDropdown ? "mt-4" : "mt-8"} space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6`}>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
              <dd className="text-base font-medium text-green-600">-${savings.toFixed(2)}</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">${shipping.toFixed(2)}</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
          </dl>
        </div>

        {isDropdown ? (
          <button
            onClick={() => navigate("/cart")}
            className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Show Cart
          </button>
        ) : (
          <button
            onClick={() => navigate("/checkout")}
            className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Proceed to Checkout
          </button>
        )}

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
          <button
            onClick={() => {
              if (isDropdown && onClose) {
                onClose();
              }
              navigate("/");
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline dark:text-primary-500"
          >
            Continue Shopping
            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  if (isDropdown) {
    return (
      <div className="w-[400px] divide-y divide-gray-100 rounded-lg bg-white shadow-lg dark:divide-gray-700 dark:bg-gray-800">
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 flex items-start gap-4">
            <div className="shrink-0">
              <img className="h-16 w-16 dark:hidden" src={item.image.light} alt={item.name} />
              <img className="hidden h-16 w-16 dark:block" src={item.image.dark} alt={item.name} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h3>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <svg className="h-3 w-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <svg className="h-3 w-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <div className="mt-2 flex items-center space-x-4">
                <button onClick={() => handleAddToFavorites(item.id)} className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center">
                  Add to Favorites
                </button>
                <button onClick={() => handleRemoveItem(item.id)} className="text-xs text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 flex items-center">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <dl className="flex justify-between text-sm">
              <dt className="text-gray-500 dark:text-gray-400">Subtotal</dt>
              <dd className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
            </dl>
            <dl className="flex justify-between text-sm">
              <dt className="text-gray-500 dark:text-gray-400">Savings</dt>
              <dd className="font-medium text-green-600">-${savings.toFixed(2)}</dd>
            </dl>
            <dl className="flex justify-between text-sm">
              <dt className="text-gray-500 dark:text-gray-400">Shipping</dt>
              <dd className="font-medium text-gray-900 dark:text-white">${shipping.toFixed(2)}</dd>
            </dl>
            <dl className="flex justify-between text-sm">
              <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
              <dd className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</dd>
            </dl>
            <dl className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-gray-900 dark:text-white">Total</dt>
              <dd className="text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
            </dl>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => navigate("/cart")}
              className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              View Cart
            </button>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">or</span>
              <button
                onClick={() => {
                  if (onClose) onClose();
                  navigate("/");
                }}
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <CartContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
