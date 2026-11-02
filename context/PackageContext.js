
"use client";

import { createContext, useContext, useState } from "react";

const PackageContext = createContext();

const initialPackages = [
  {
    name: "Wireless Headphones",
    store: "Amazon",
    date: "24 October 2026",
    days: "6 days ago",
    status: "Out for delivery",
    color: "bg-purple-100",
    icon: "🎧",
  },
  {
    name: "Running Shoes",
    store: "Myntra",
    date: "27 October 2026",
    days: "3 days ago",
    status: "In transit",
    color: "bg-blue-100",
    icon: "👟",
  },
  {
    name: "Study Lamp",
    store: "Flipkart",
    date: "29 October 2026",
    days: "1 day ago",
    status: "Order placed",
    color: "bg-orange-100",
    icon: "💡",
  },
];

export function PackageProvider({ children }) {
  const [packagesList, setPackagesList] = useState(initialPackages);

  return (
    <PackageContext.Provider value={{ packagesList, setPackagesList }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackages() {
  return useContext(PackageContext);
}
