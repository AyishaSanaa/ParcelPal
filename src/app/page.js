
"use client";

import { useState } from "react";
import PackageCard from "./components/PackageCard";
import { usePackages } from "../../context/PackageContext";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  const { packagesList, setPackagesList } = usePackages();

  // Dashboard statistics
  const totalPackages = packagesList.length;

  const deliveredPackages = packagesList.filter(
    (item) => item.status === "Delivered"
  ).length;

  const onTheWayPackages = totalPackages - deliveredPackages;

  // Add a new package
  function handleAddPackage(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newPackage = {
      name: formData.get("name"),
      store: formData.get("store"),
      date: formData.get("date"),
      days: "",
      status: "Order placed",
      color: "bg-purple-100",
      icon: "📦",
    };

    setPackagesList((previousPackages) => [
      ...previousPackages,
      newPackage,
    ]);

    setShowForm(false);
    setActivePage("My Packages");
  }

  // Mark a package as delivered
  function handleMarkDelivered(index) {
    setPackagesList((previousPackages) =>
      previousPackages.map((item, i) =>
        i === index
          ? { ...item, status: "Delivered" }
          : item
      )
    );
  }

  // Choose packages based on the selected page
  const displayedPackages =
    activePage === "Order History"
      ? packagesList.filter((item) => item.status === "Delivered")
      : activePage === "My Packages"
      ? packagesList
      : [];

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "My Packages", icon: "📦" },
    { name: "Order History", icon: "🕒" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <main className="min-h-screen bg-[#f7f6fc] text-gray-800">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-[#30205c] p-7 text-white">
          <h1 className="text-2xl font-bold">📦 ParcelPal</h1>

          <p className="mt-2 text-sm text-purple-200">
            Your delivery companion
          </p>

          <nav className="mt-12 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setShowForm(false);
                }}
                className={`w-full rounded-xl p-3 text-left text-sm transition ${
                  activePage === item.name
                    ? "bg-white/15 text-white"
                    : "text-purple-200 hover:bg-white/10"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-20 rounded-2xl bg-white/10 p-4">
            <p className="font-semibold">Stay organised!</p>
            <p className="mt-2 text-xs text-purple-200">
              Keep all your online orders in one place.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 p-5 md:p-9">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                ParcelPal
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {activePage}
              </h2>
            </div>

            <div className="rounded-full bg-white p-3 shadow-sm">
              👤
            </div>
          </div>

          {/* DASHBOARD */}
          {activePage === "Dashboard" && (
            <>
              {/* Welcome Section */}
              <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#5835a5] to-[#9272df] p-7 text-white shadow-lg">
                <p className="text-sm text-purple-100">
                  WELCOME TO PARCELPAL
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  All your deliveries,
                  <br /> one happy place.
                </h2>

                <p className="mt-3 text-sm text-purple-100">
                  Keep track of your orders in one place.
                </p>

                <button
                  onClick={() => setShowForm(!showForm)}
                  className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-purple-800"
                >
                  + Add a package
                </button>
              </div>

              {/* Add Package Form */}
              {showForm && (
                <form
                  onSubmit={handleAddPackage}
                  className="mt-5 rounded-2xl bg-white p-6 shadow"
                >
                  <h3 className="mb-4 text-lg font-bold">
                    Add a new package
                  </h3>

                  <input
                    name="name"
                    placeholder="Product name"
                    required
                    className="mb-3 w-full rounded-lg border p-3"
                  />

                  <input
                    name="store"
                    placeholder="Shopping platform (Amazon, Myntra...)"
                    required
                    className="mb-3 w-full rounded-lg border p-3"
                  />

                  <label className="text-sm text-gray-600">
                    Date ordered
                  </label>

                  <input
                    name="date"
                    type="date"
                    required
                    className="mb-4 mt-2 w-full rounded-lg border p-3"
                  />

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white"
                    >
                      Save package
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Statistics */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Total packages 📦
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">
                    {totalPackages}
                  </h3>
                </div>

                <div className="rounded-2xl bg-purple-100 p-5">
                  <p className="text-sm text-purple-700">
                    On the way 🚚
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-purple-900">
                    {onTheWayPackages}
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-100 p-5">
                  <p className="text-sm text-blue-700">
                    Delivered ✓
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-blue-900">
                    {deliveredPackages}
                  </h3>
                </div>
              </div>

              {/* Recent Packages */}
              <div className="mt-9">
                <h2 className="text-xl font-bold">
                  Your packages
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep an eye on everything you've ordered.
                </p>

                <div className="mt-5 space-y-4">
                  {packagesList.map((item, index) => (
                    <PackageCard
                      key={`${item.name}-${index}`}
                      item={item}
                      onMarkDelivered={() =>
                        handleMarkDelivered(index)
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* MY PACKAGES AND ORDER HISTORY */}
          {(activePage === "My Packages" ||
            activePage === "Order History") && (
            <div className="mt-8">
              <div className="rounded-3xl bg-gradient-to-r from-[#5835a5] to-[#9272df] p-7 text-white">
                <h2 className="text-2xl font-bold">
                  {activePage === "My Packages"
                    ? "All your packages 📦"
                    : "Your delivery history 🕒"}
                </h2>

                <p className="mt-2 text-sm text-purple-100">
                  {activePage === "My Packages"
                    ? "View and manage all your online orders."
                    : "Here are the packages you have marked as delivered."}
                </p>

                {activePage === "My Packages" && (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="mt-5 rounded-xl bg-white px-5 py-3 font-semibold text-purple-800"
                  >
                    + Add a package
                  </button>
                )}
              </div>

              {activePage === "My Packages" && showForm && (
                <form
                  onSubmit={handleAddPackage}
                  className="mt-5 rounded-2xl bg-white p-6 shadow"
                >
                  <h3 className="mb-4 text-lg font-bold">
                    Add a new package
                  </h3>

                  <input
                    name="name"
                    placeholder="Product name"
                    required
                    className="mb-3 w-full rounded-lg border p-3"
                  />

                  <input
                    name="store"
                    placeholder="Shopping platform"
                    required
                    className="mb-3 w-full rounded-lg border p-3"
                  />

                  <label className="text-sm text-gray-600">
                    Date ordered
                  </label>

                  <input
                    name="date"
                    type="date"
                    required
                    className="mb-4 mt-2 w-full rounded-lg border p-3"
                  />

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white"
                    >
                      Save package
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="rounded-xl bg-gray-100 px-5 py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 space-y-4">
                {displayedPackages.length > 0 ? (
                  displayedPackages.map((item) => {
                    const originalIndex = packagesList.indexOf(item);

                    return (
                      <PackageCard
                        key={`${item.name}-${originalIndex}`}
                        item={item}
                        onMarkDelivered={() =>
                          handleMarkDelivered(originalIndex)
                        }
                      />
                    );
                  })
                ) : (
                  <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <p className="text-4xl">
                      {activePage === "My Packages" ? "📦" : "🕒"}
                    </p>

                    <h3 className="mt-4 text-lg font-bold">
                      {activePage === "My Packages"
                        ? "No packages yet"
                        : "No delivery history yet"}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {activePage === "My Packages"
                        ? "Add your first package to get started."
                        : "Packages you mark as delivered will appear here."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activePage === "Settings" && (
            <div className="mt-8 max-w-2xl">
              <div className="rounded-3xl bg-gradient-to-r from-[#5835a5] to-[#9272df] p-7 text-white">
                <h2 className="text-2xl font-bold">
                  Settings ⚙
                </h2>

                <p className="mt-2 text-sm text-purple-100">
                  Manage your ParcelPal preferences.
                </p>
              </div>

              <div className="mt-6 space-y-4">

                {/* App Information */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold">
                    App Information
                  </h3>

                  <div className="mt-4 flex justify-between border-b py-3">
                    <span className="text-gray-500">
                      Application
                    </span>
                    <span className="font-medium">
                      ParcelPal
                    </span>
                  </div>

                  <div className="flex justify-between py-3">
                    <span className="text-gray-500">
                      Version
                    </span>
                    <span className="font-medium">
                      1.0.0
                    </span>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold">
                    Preferences
                  </h3>

                  <div className="flex items-center justify-between border-b py-5">
                    <div>
                      <p className="font-medium">
                        Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Enable app notifications.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setNotifications(!notifications)
                      }
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        notifications
                          ? "bg-purple-700 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {notifications ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-5">
                    <div>
                      <p className="font-medium">
                        Delivery reminders
                      </p>
                      <p className="text-sm text-gray-500">
                        Enable delivery reminders.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setReminders(!reminders)
                      }
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        reminders
                          ? "bg-purple-700 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {reminders ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

