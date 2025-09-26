import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MessageCircle,
  Package,
  Building2,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  Hash,
} from "lucide-react";
import productApi from "../../api/productApi";
import userApi from "../../api/userApi";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ProductList = ({ selectedCategory = "All", selectedType = "All" }) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [enquiryProductId, setEnquiryProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { state: authState } = useAuth();

  // Function to filter products
  const filterProducts = (productList) => {
    return productList.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const typeMatch = selectedType === "All" || product.type === selectedType;
      const searchMatch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && typeMatch && searchMatch;
    });
  };

  const [formData, setFormData] = useState({
    name: authState?.user?.fullName || "",
    email: authState?.user?.email || "",
    phoneNumber: "",
    quantity: 1,
  });
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching products...");
        const response = await productApi.getProducts();
        console.log("API Response:", response);

        if (response.success) {
          let filteredProducts = response.data;
          console.log("Total products:", filteredProducts.length);

          // Apply category filter
          if (selectedCategory !== "All") {
            filteredProducts = filteredProducts.filter(
              (product) => product.category === selectedCategory
            );
            console.log("After category filter:", filteredProducts.length);
          }

          // Apply type filter
          if (selectedType !== "All") {
            filteredProducts = filteredProducts.filter(
              (product) => product.type === selectedType
            );
            console.log("After type filter:", filteredProducts.length);
          }

          setProducts(filteredProducts);
        } else {
          console.error("API returned success: false");
          setError("Failed to fetch products");
          toast.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
        toast.error(err.message || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    console.log(
      "Filter changed - Category:",
      selectedCategory,
      "Type:",
      selectedType
    );
    fetchProducts();
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [selectedCategory, selectedType]);

  const handleEnquiryClick = (productName, productId) => {
    setEnquiryProduct(productName);
    setEnquiryProductId(productId);
    setShowEnquiryModal(true);
  };

  const handleCloseModal = () => {
    setShowEnquiryModal(false);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      quantity: null,
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.quantity
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const queryData = {
        productId: enquiryProductId,
        product: enquiryProduct,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        quantity: parseInt(formData.quantity),
      };

      const response = await userApi.submitProductQuery(
        authState.user._id,
        queryData
      );

      if (response.success) {
        toast.success("Query submitted successfully!");
        setShowEnquiryModal(false);
        setFormData({
          name: authState?.user?.fullName || "",
          email: authState?.user?.email || "",
          phoneNumber: "",
          quantity: 1,
        });
      } else {
        toast.error(response.message || "Failed to submit query");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Error submitting enquiry");
    }
  };

  const handleAddToCart = (product) => {
    if (!product.inventory.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      quantity: 1,
      price: product.price,
      productImg: product.productImg,
      maxQuantity: product.inventory.quantity,
    };

    addToCart(cartItem);
    toast.success(`${product.name} added to cart`);
  };

  const handleProductClick = (productId) => {
    navigate(`/user/product/${productId}`);
  };

  // Apply filters to products
  const filteredProducts = filterProducts(products);

  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedType, searchQuery]);

  // Apply filters and pagination
  const allFilteredProducts = filterProducts(products);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-800 text-lg font-semibold">
            Loading Products
          </p>
          <p className="text-slate-600 mt-2">Category: {selectedCategory}</p>
          <p className="text-slate-600">Type: {selectedType}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-red-100 shadow-lg text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">⚠️</div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Products
          </h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-indigo-500/5"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        {/* Search Stats */}
        {searchQuery && (
          <div className="mb-4 text-center">
            <p className="text-slate-600">
              Found {allFilteredProducts.length} products matching &ldquo;
              {searchQuery}&rdquo;
            </p>
          </div>
        )}
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, category, type, or manufacturer..."
                className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-400"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {selectedCategory !== "All" || selectedType
              ? `${
                  selectedCategory === "All" ? selectedType : selectedCategory
                } Products`
              : "Our Product Collection"}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our comprehensive range of quality pharmaceutical products
            and healthcare solutions
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <div
                className="relative cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.inventory.inStock ? (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <div className="inline-flex items-center bg-gradient-to-r from-teal-50 to-indigo-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium mb-2">
                    <Package className="w-3 h-3 mr-1" />
                    {product.type}
                  </div>
                  <h3
                    className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 cursor-pointer hover:text-teal-600 transition-colors"
                    onClick={() => handleProductClick(product._id)}
                  >
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                  {product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= product.rating
                          ? "text-yellow-400 fill-current"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-500 ml-2">
                    ({product.rating}/5)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{product.price}
                  </span>
                </div>

                {/* Product Details */}
                <div className="space-y-2 text-xs text-slate-600 mb-4">
                  <div className="flex items-center">
                    <Building2 className="w-3 h-3 mr-2 text-slate-400" />
                    <span className="font-medium">Category:</span>
                    <span className="ml-1">{product.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-3 h-3 mr-2 text-slate-400" />
                    <span className="font-medium">Manufacturer:</span>
                    <span className="ml-1">{product.manufacturer}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Stock:</span>
                    <span
                      className={`ml-1 ${
                        product.inventory.inStock
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.inventory.quantity} units
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEnquiryClick(product.name, product._id)
                    }
                    className="flex-1 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-medium py-2 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Enquiry
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inventory.inStock}
                    className={`flex-1 font-medium py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm ${
                      product.inventory.inStock
                        ? "bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-50 hover:scale-105"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentPage === 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg hover:scale-105 border border-white/20"
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <span className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium">
            Page {currentPage}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastProduct >= filteredProducts.length}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              indexOfLastProduct >= filteredProducts.length
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg hover:scale-105 border border-white/20"
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Product Enquiry
                </h2>
                <p className="text-sm text-slate-600 mt-1">{enquiryProduct}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Product ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={enquiryProductId}
                      disabled
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-600"
                    />
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Package className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={enquiryProduct}
                      disabled
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-600"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleFormChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Quantity Required *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleFormChange}
                    placeholder="Enter required quantity"
                    required
                    min="1"
                    className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-white/50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleFormSubmit}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Submit Enquiry
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
ProductList.propTypes = {
  selectedCategory: PropTypes.string,
  selectedType: PropTypes.string,
};

export default ProductList;
