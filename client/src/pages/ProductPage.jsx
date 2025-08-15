import React from "react";
import { useParams } from "react-router-dom";
import ProductOverview from "../components/ProductOverview";

const ProductPage = () => {
  const { id } = useParams();

  // Data produk (contoh - seharusnya diambil dari API/Redux store)
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
      features: [
        "Studio quality three mic array for crystal clear calls and voice recordings",
        "Six-speaker sound system for remarkably robust audio experience",
        "Up to 256GB of ultrafast SSD storage",
        "Two Thunderbolt USB 4 ports and up to two USB 3 ports",
        "Ultrafast Wi-Fi 6 and Bluetooth 5.0 wireless",
        "Color matched Magic Mouse with Magic Keyboard",
      ],
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

  const product = products.find((p) => p.id === Number(id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProductOverview product={product} />
    </div>
  );
};

export default ProductPage;
