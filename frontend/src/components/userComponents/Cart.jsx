import { useCallback } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Package,
  CreditCard,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";

const Cart = () => {
  const cartContext = useCart();
  const {
    state,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = cartContext;

  const handleRemoveFromCart = useCallback(
    (item) => {
      removeFromCart(item);
    },
    [removeFromCart]
  );

  const handleIncreaseQuantity = useCallback(
    (item) => {
      increaseQuantity(item.productId);
    },
    [increaseQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      decreaseQuantity(item.productId);
    },
    [decreaseQuantity]
  );

  const handleClearCart = () => {
    clearCart();
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  // Helper functions
  const calculateSubtotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTotal = (items) => calculateSubtotal(items) + 5.0; // 5.0 is shipping cost

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="flex-1 container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-slate-600 mb-8">
              Start shopping to add items to your cart and discover our quality
              pharmaceutical products.
            </p>
            <button
              onClick={() => navigate("/user/product")}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Package className="w-5 h-5 mr-2" />
              Browse Products
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg mb-6">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shopping Cart
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900 mb-4">
              Your Selected Items
            </h1>
            <p className="text-slate-600 md:text-lg">
              Review your pharmaceutical products before proceeding to checkout
            </p>
          </div>
        </div>
      </section>

      {/* Main Cart Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Cart Items ({state.items.length})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {state.items.map((item) => (
                  <div key={item.productId} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.productImg}
                          alt={item.name}
                          className="w-20 h-20 rounded-2xl object-cover shadow-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-slate-600 mb-3">
                              Pharmaceutical Product
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-slate-600">
                                Quantity:
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleDecreaseQuantity(item)}
                                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:border-teal-500 hover:text-teal-600 transition-colors duration-300"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium text-slate-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleIncreaseQuantity(item)}
                                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:border-teal-500 hover:text-teal-600 transition-colors duration-300"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Price and Remove */}
                          <div className="text-right">
                            <p className="text-xl font-bold text-slate-900 mb-2">
                              ₹{item.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                              per unit
                            </p>
                            <button
                              onClick={() => handleRemoveFromCart(item)}
                              className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                          <span className="text-sm text-slate-600">
                            Item Total:
                          </span>
                          <span className="text-lg font-bold text-teal-600">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ₹{calculateSubtotal(state.items).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium text-slate-900">₹50.00</span>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-teal-600">
                      ₹{calculateTotal(state.items).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-slate-600">
                      SSL encrypted & HIPAA compliant
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate("/user/product")}
                className="w-full mt-3 border-2 border-slate-200 text-slate-700 font-medium py-3 px-6 rounded-xl hover:bg-slate-50 hover:border-teal-300 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Delivery Information
              </h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Free delivery on orders above ₹500</p>
                <p>• Standard delivery: 2-3 business days</p>
                <p>• Express delivery: Next business day</p>
                <p>• Prescription verification required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Why Choose Vijaya Pharmaceuticals?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium">FDA Approved Products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium">Secure Packaging</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium">Safe Payment</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
