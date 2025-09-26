import React, { useState } from "react";
import { Filter, Grid, Heart, ChevronDown, Pill } from "lucide-react";
import ProductList from "./ProductList";
// import toast from "react-hot-toast";

const ProductSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add styles to root element to prevent interference with navigation
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .product-page-container {
        position: relative;
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Use your custom arrays for categories and types
  const categoryOptions = [
    "All",
    "ANTI CANCER",
    "ANTI HIV",
    "PAIN RELIEF",
    "SKIN CARE",
    "VITAMINS",
    "HEART HEALTH",
    "DIGESTIVE",
    "WOMEN'S HEALTH",
    "COLD & FLU",
    "DIABETES",
    "ALLERGY",
    "BONE HEALTH",
    "EYE CARE",
    "SLEEP AID",
  ];

  const typeOptions = [
    "TABLET",
    "INJECTION",
    "CAPSULE",
    "CREAM",
    "SYRUP",
    "INSULIN",
    "DROPS",
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // Keep the type as 'All' when changing category
    setSelectedType("All");
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="product-page-container min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative"
      style={{ zIndex: 1 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-indigo-500/5"></div>

      <div className="relative flex flex-col lg:flex-row" style={{ zIndex: 2 }}>
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Filter className="w-5 h-5 mr-2" />
            {isSidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`lg:w-80 bg-white/80 backdrop-blur-sm border-r border-white/20 shadow-lg transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-violet-950">
                    VIJAYA PHARMACEUTICALS
                  </h1>
                  <p className="text-sm text-slate-600">Filter Products</p>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="space-y-6">
              {/* Categories */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-4 border border-teal-200">
                <div className="flex items-center mb-4">
                  <Grid className="w-5 h-5 text-teal-600 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800">
                    Product Categories
                  </h2>
                </div>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl px-4 py-3 pr-10 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-600 pointer-events-none" />
                </div>
                <div className="mt-3">
                  <span className="text-sm text-teal-700 font-medium">
                    Selected:{" "}
                    <span className="text-teal-800">{selectedCategory}</span>
                  </span>
                </div>
              </div>

              {/* Product Types */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4 border border-indigo-200">
                <div className="flex items-center mb-4">
                  <Pill className="w-5 h-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-semibold text-slate-800">
                    Product Types
                  </h2>
                </div>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-xl px-4 py-3 pr-10 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="All">All Types</option>
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-600 pointer-events-none" />
                </div>
                <div className="mt-3">
                  <span className="text-sm text-indigo-700 font-medium">
                    Selected:{" "}
                    <span className="text-indigo-800">
                      {selectedType || "All Types"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Active Filters Summary */}
              <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-4 border border-violet-200">
                <h3 className="text-sm font-semibold text-violet-800 mb-3">
                  Active Filters
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-violet-700">Category:</span>
                    <span className="text-sm font-medium text-violet-800 bg-white/50 px-2 py-1 rounded-lg">
                      {selectedCategory}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-violet-700">Type:</span>
                    <span className="text-sm font-medium text-violet-800 bg-white/50 px-2 py-1 rounded-lg">
                      {selectedType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(selectedCategory !== "All" || selectedType !== "All") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedType("All");
                  }}
                  className="w-full bg-white border-2 border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 hover:border-teal-300 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Filter Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-2xl border border-white/20">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">
                Filter Information
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use the category and type filters to find the exact
                pharmaceutical products you need. All products are quality
                assured and FDA approved.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Header Bar */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-white/20 p-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {selectedCategory !== "All" || selectedType
                    ? `${
                        selectedCategory === "All"
                          ? selectedType
                          : selectedCategory
                      } Products`
                    : "All Products"}
                </h1>
                <p className="text-slate-600 mt-1">
                  Browse our comprehensive pharmaceutical collection
                </p>
              </div> */}

              {/* Mobile close button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-slate-500 mt-4">
              <span className="hover:text-teal-600 cursor-pointer transition-colors">
                Home
              </span>
              <span>/</span>
              <span className="hover:text-teal-600 cursor-pointer transition-colors">
                Products
              </span>
              {selectedCategory !== "All" && (
                <>
                  <span>/</span>
                  <span className="text-slate-800 font-medium">
                    {selectedCategory}
                  </span>
                </>
              )}
              {selectedType && (
                <>
                  <span>/</span>
                  <span className="text-slate-800 font-medium">
                    {selectedType}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Product List Container */}
          <div className="p-6 lg:p-8">
            <div className="relative" style={{ zIndex: 1 }}>
              <ProductList
                selectedCategory={selectedCategory}
                selectedType={selectedType}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProductSidebar;
