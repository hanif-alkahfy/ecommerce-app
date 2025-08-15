import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const sortDropdownRef = React.useRef(null);

  // Handle click outside sort dropdown
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    rating: 0,
    features: [],
  });

  // Data produk (contoh)
  const products = [
    {
      id: 1,
      name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
      price: 1699,
      rating: 5.0,
      reviewCount: 455,
      discount: "35%",
      image: {
        light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
        dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
      },
      features: ["Best Seller", "Best Price"],
    },
    {
      id: 2,
      name: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
      price: 1199,
      rating: 4.9,
      reviewCount: 1233,
      discount: "15%",
      image: {
        light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
        dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg",
      },
      features: ["Best Seller", "Best Price"],
    },
    {
      id: 3,
      name: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
      price: 799,
      rating: 4.9,
      reviewCount: 879,
      discount: "35%",
      image: {
        light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg",
        dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg",
      },
      features: ["Shipping Today", "Best Price"],
    },
    {
      id: 4,
      name: "Microsoft Xbox Series X 1TB Gaming Console",
      price: 499,
      rating: 4.8,
      reviewCount: 4263,
      discount: "10%",
      image: {
        light: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg",
        dark: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg",
      },
      features: ["Fast Delivery", "Best Price"],
    },
  ];

  const toggleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };

  const handleAddToCart = (productId) => {
    console.log("Adding to cart:", productId);
    // Implementasi logika add to cart
  };

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToFavorites = (productId) => {
    console.log("Add to favorites:", productId);
    // Implementasi logika add to favorites
  };

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Fungsi untuk menerapkan filter
  const applyFilters = () => {
    let result = [...products];

    // Filter by price range
    result = result.filter((product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max);

    // Filter by rating
    if (filters.rating > 0) {
      result = result.filter((product) => product.rating >= filters.rating);
    }

    // Filter by features
    if (filters.features.length > 0) {
      result = result.filter((product) => product.features.some((feature) => filters.features.includes(feature)));
    }

    setFilteredProducts(result);
    setFilterModalOpen(false);
  };

  // Fungsi untuk handle sort
  const handleSort = (sortType) => {
    setSortBy(sortType);
    setSortDropdownOpen(false);

    let sorted = [...filteredProducts];
    switch (sortType) {
      case "popular":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        // Untuk demo, kita sort berdasarkan ID
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };
  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Heading & Filters */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                      Products
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">Electronics</span>
                  </div>
                </li>
              </ol>
            </nav>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Electronics</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFilterModal}
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                />
              </svg>
              Filters
            </button>
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={toggleSortDropdown}
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
              >
                <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                </svg>
                {sortBy
                  ? sortBy
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
                  : "Sort"}
              </button>

              {sortDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button onClick={() => handleSort("popular")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Most Popular
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleSort("newest")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Newest
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleSort("price-asc")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Price: Low to High
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleSort("price-desc")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Price: High to Low
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleSort("rating")} className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Rating
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              onClick={() => handleQuickView(product.id)}
            >
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100">
                <img className="h-full w-full object-contain object-center dark:hidden" src={product.image.light} alt={product.name} />
                <img className="hidden h-full w-full object-contain object-center dark:block" src={product.image.dark} alt={product.name} />
                <div className="absolute left-2 top-2">
                  <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">Up to {product.discount} off</span>
                </div>
                <div className="absolute right-2 top-2 flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites(product.id);
                    }}
                    className="rounded-full bg-white p-1.5 text-gray-900 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    <span className="sr-only">Add to favorites</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600">{product.name}</h3>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-200">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-4 w-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {product.rating} ({product.reviewCount})
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    className="inline-flex items-center rounded-lg bg-primary-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="w-full text-center">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Show more
          </button>
        </div>
      </div>

      {/* Removed Quick View Modal */}

      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-xl rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:p-5">
            <div className="flex items-start justify-between rounded-t">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={toggleFilterModal}
                type="button"
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 py-4">
              {/* Price Range */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Range</h4>
                <div className="flex items-center gap-4">
                  <div className="w-1/2">
                    <label htmlFor="min-price" className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                      Min Price
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      value={filters.priceRange.min}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: { ...prev.priceRange, min: Number(e.target.value) },
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="max-price" className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                      Max Price
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      value={filters.priceRange.max}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: { ...prev.priceRange, max: Number(e.target.value) },
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Rating</h4>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Star</option>
                </select>
              </div>

              {/* Features Filter */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Features</h4>
                <div className="space-y-2">
                  {["Fast Delivery", "Best Price", "Best Seller", "Shipping Today"].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({
                              ...prev,
                              features: [...prev.features, feature],
                            }));
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              features: prev.features.filter((f) => f !== feature),
                            }));
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                      <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={applyFilters}
                type="button"
                className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  setFilters({
                    priceRange: { min: 0, max: 2000 },
                    rating: 0,
                    features: [],
                  });
                  setFilteredProducts(products);
                  setFilterModalOpen(false);
                }}
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
