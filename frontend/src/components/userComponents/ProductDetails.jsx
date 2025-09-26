import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Package,
  Building2,
  Tag,
  Shield,
  Heart,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import productApi from "../../api/productApi";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await productApi.getProductById(productId);
        if (response.success) {
          setProduct(response.data);
        } else {
          toast.error("Failed to fetch product details");
          navigate("/user/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error loading product details");
        navigate("/user/products");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, navigate]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    if (!product.inventory.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      quantity,
      price: product.price,
      productImg: product.productImg,
      maxQuantity: product.inventory.quantity,
    };

    addToCart(cartItem);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center relative"
        style={{ zIndex: 0 }}
      >
        <div className="text-center relative" style={{ zIndex: 1 }}>
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center relative"
        style={{ zIndex: 0 }}
      >
        <div className="text-center relative" style={{ zIndex: 1 }}>
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative"
      style={{ zIndex: 0 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-indigo-500/5"></div>

      <div
        className="relative max-w-7xl mx-auto px-4 py-8"
        style={{ zIndex: 1 }}
      >
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <button
              onClick={() => navigate("/")}
              className="hover:text-teal-600 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate("/user/products")}
              className="hover:text-teal-600 transition-colors"
            >
              Products
            </button>
            <span>/</span>
            <span className="text-slate-900 font-medium">
              {product.category}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-3xl"></div>
              <img
                src={
                  product.productImg || "https://via.placeholder.com/600x600"
                }
                alt={product.name}
                className="w-full aspect-square object-cover rounded-3xl shadow-2xl relative z-10"
              />
              {product.inventory.inStock && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center z-20">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  In Stock
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Package className="w-4 h-4 mr-2" />
                {product.type}
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= product.rating
                        ? "text-yellow-400 fill-current"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-600">({product.rating}/5)</span>
            </div>

            {/* Price */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Price per unit</p>
                  <p className="text-3xl font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-1">Total Stock</p>
                  <p className="text-lg font-semibold text-green-600">
                    {product.inventory.quantity} units
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-2">
                  <Tag className="w-5 h-5 text-teal-600 mr-2" />
                  <span className="font-semibold text-slate-700">Category</span>
                </div>
                <p className="text-slate-600">{product.category}</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-2">
                  <Building2 className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="font-semibold text-slate-700">
                    Manufacturer
                  </span>
                </div>
                <p className="text-slate-600">{product.manufacturer}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-teal-50 to-indigo-50 text-teal-700 rounded-lg text-sm border border-teal-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            {product.inventory.inStock ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Quantity
                    </label>
                    <select
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-24 px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 10, 20, 50].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-2">Total Price</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center justify-center text-red-600">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  <span className="font-semibold">Out of Stock</span>
                </div>
                <p className="text-red-600 text-center mt-2">
                  This product is currently unavailable
                </p>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">
                  Quality Assured
                </p>
                <p className="text-xs text-slate-500">FDA Approved</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">
                  Fast Delivery
                </p>
                <p className="text-xs text-slate-500">2-3 Days</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 text-violet-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">
                  Customer Care
                </p>
                <p className="text-xs text-slate-500">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Additional Information
            </h2>
            <div className="prose text-slate-600 leading-relaxed">
              <p>
                This pharmaceutical product has been carefully formulated to
                meet the highest standards of quality and efficacy. Our
                commitment to excellence ensures that every tablet delivers
                consistent results for optimal patient care.
              </p>
              <p className="mt-4">
                <strong>Important:</strong> Please consult with a healthcare
                professional before use. Follow dosage instructions carefully
                and read all warnings and precautions before taking this
                medication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
