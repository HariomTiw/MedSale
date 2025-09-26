import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Shield,
  Users,
  Award,
  Truck,
  Phone,
  Mail,
} from "lucide-react";

const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const mainText = "Your Trusted Partner in Quality Healthcare";
  const [animatedText, setAnimatedText] = useState("");
  const [underlineVisible, setUnderlineVisible] = useState(false);

  useEffect(() => {
    const mainTextLength = mainText.length;
    let currentIndex = 0;

    const interval = setInterval(() => {
      setAnimatedText(mainText.substring(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === mainTextLength) {
        clearInterval(interval);
        setUnderlineVisible(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const textSpring = {
    opacity: 1,
    transform: "translateY(0)",
  };

  const underlineSpring = {
    width: underlineVisible ? "100%" : "0%",
  };

  const featuresSpring = {
    opacity: 1,
    transform: "translateY(0)",
  };

  const statsSpring = {
    opacity: 1,
    transform: "scale(1)",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <main className="flex-1 mx-auto w-full">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10"></div>

          <div className="absolute inset-0 opacity-30"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Healthcare Excellence Since 1995
                  </div>

                  <h1
                    className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl relative text-slate-900 leading-tight"
                    style={textSpring}
                  >
                    {animatedText}
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                      style={underlineSpring}
                    />
                  </h1>

                  <p className="max-w-[600px] text-slate-600 md:text-xl leading-relaxed">
                    Discover premium pharmaceutical products with wholesale and
                    retail options. From essential medicines to wellness
                    supplements - your health is our mission.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/user/product"
                    className="group inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-8 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Shop Products
                  </Link>
                  <Link
                    to="/user/contact"
                    className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-teal-300 hover:shadow-md"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Us
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div
                  style={statsSpring}
                  className="flex items-center gap-8 pt-6"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">25+</div>
                    <div className="text-sm text-slate-600">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      10k+
                    </div>
                    <div className="text-sm text-slate-600">
                      Happy Customers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">
                      500+
                    </div>
                    <div className="text-sm text-slate-600">Products</div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  width="650"
                  height="550"
                  alt="Modern Pharmacy"
                  className="mx-auto aspect-video overflow-hidden rounded-3xl object-cover shadow-2xl lg:aspect-square relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        FDA Approved
                      </div>
                      <div className="text-sm text-slate-600">
                        Quality Guaranteed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          style={featuresSpring}
          className="w-full py-16 md:py-24 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 mb-4">
                Why Choose Vijaya Pharmaceuticals?
              </h2>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">
                We combine decades of experience with modern technology to
                deliver exceptional healthcare solutions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Premium Quality
                </h3>
                <p className="text-slate-600 text-sm">
                  All products undergo rigorous quality testing and meet
                  international standards.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-slate-600 text-sm">
                  Quick and secure delivery across India with real-time
                  tracking.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Expert Support
                </h3>
                <p className="text-slate-600 text-sm">
                  24/7 customer support from qualified pharmaceutical
                  professionals.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Secure & Safe
                </h3>
                <p className="text-slate-600 text-sm">
                  Secure payment processing and safe handling of all medical
                  products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-teal-500 to-indigo-500">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                Stay Updated with Health News
              </h2>
              <p className="mx-auto max-w-[600px] text-teal-50 md:text-lg">
                Get the latest updates on new products, health tips, and
                exclusive offers delivered to your inbox.
              </p>

              <div className="mx-auto w-full max-w-md">
                <div className="flex gap-3">
                  <input
                    className="flex h-12 w-full rounded-xl border-0 bg-white/90 backdrop-blur px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    placeholder="Enter your email address"
                    type="email"
                  />
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 bg-white text-teal-600 hover:bg-slate-50 hover:shadow-lg h-12 px-6"
                    onClick={() => console.log("Newsletter subscription")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-teal-100 mt-3">
                  Subscribe to receive health tips and product updates from
                  Vijaya Pharmaceuticals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 mb-4">
                Explore Our Product Categories
              </h2>
              <p className="mx-auto max-w-[600px] text-slate-600 md:text-lg">
                From prescription medicines to wellness supplements, find
                everything you need for optimal health.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Prescription Medicines"
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Prescription Medicines
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Complete range of prescription medications from trusted
                    brands.
                  </p>
                  <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                    Explore →
                  </button>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Wellness Supplements"
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Wellness Supplements
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Vitamins, minerals, and herbal supplements for daily
                    wellness.
                  </p>
                  <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    Explore →
                  </button>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Medical Devices"
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Medical Devices
                  </h3>
                  <p className="text-slate-600 mb-4">
                    High-quality medical equipment and diagnostic devices.
                  </p>
                  <button className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white">
                  Wholesale & Retail
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900">
                  Ready to Partner with Us?
                </h2>
                <p className="max-w-[600px] text-slate-600 md:text-lg leading-relaxed">
                  Whether you&apos;re a healthcare provider, pharmacy, or
                  individual customer, we have tailored solutions for your
                  needs. Join thousands of satisfied customers who trust Vijaya
                  Pharmaceuticals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-8 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Start Shopping
                  </button>
                  <button className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-teal-300 transition-all duration-300">
                    Wholesale Inquiry
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Healthcare Team"
                  className="rounded-3xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
