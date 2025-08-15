import React from "react";
import { useNavigate } from "react-router-dom";

const ProductOverview = ({ product }) => {
  const navigate = useNavigate();

  if (!product) {
    return <div className="text-center p-8">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative w-full">
        <button onClick={() => navigate(-1)} className="fixed left-4 top-4 z-50 rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white bg-white dark:bg-gray-800 shadow-lg">
          <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only">Go back</span>
        </button>

        <section className="antialiased bg-white py-8 dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-xl bg-gray-100 p-8 dark:bg-gray-800 lg:aspect-[4/3]">
                <img className="h-full w-full object-contain dark:hidden" src={product.image.light} alt={product.name} loading="eager" />
                <img className="hidden h-full w-full object-contain dark:block" src={product.image.dark} alt={product.name} loading="eager" />
                <div className="absolute left-4 top-4">
                  <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-300">Up to {product.discount} off</span>
                </div>
              </div>

              <div className="mt-8 lg:mt-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">{product.name}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">${product.price}</p>

                  <div className="mt-2 flex items-center gap-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < product.rating ? "text-yellow-300" : "text-gray-300 dark:text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">({product.rating})</p>
                    <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                      {product.reviewCount} Reviews
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex sm:mt-8 sm:items-center sm:gap-4">
                  <button
                    onClick={() => console.log("Add to favorites:", product.id)}
                    className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to favorites
                  </button>

                  <button
                    onClick={() => console.log("Add to cart:", product.id)}
                    className="mt-4 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                    </svg>
                    Add to cart
                  </button>
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-800 md:my-8" />

                {product.features && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Features:</h3>
                    <ul className="list-disc space-y-2 pl-5 text-gray-500 dark:text-gray-400">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductOverview;
