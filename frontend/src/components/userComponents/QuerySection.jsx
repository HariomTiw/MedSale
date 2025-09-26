import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  User,
  Package,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

function QuerySection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    productName: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state } = useAuth();
  const userId = state.user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await userApi.submitUserMessage(userId, formData);

      if (response.success) {
        const messageId = response.data._id;
        const path = `/user/message/${messageId}`;
        toast.success("Query submitted successfully");
        navigate(path);
        setFormData({
          name: "",
          contactNumber: "",
          productName: "",
          subject: "",
        });
      } else {
        toast.error("Error submitting enquiry");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      toast.error("Error submitting enquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get In Touch
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900 mb-4">
              We&apos;re Here to Help
            </h1>
            <p className="mx-auto max-w-[600px] text-slate-600 md:text-lg">
              Have questions about our products or need assistance? Reach out to
              our expert team for personalized support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-indigo-50/50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    <Package className="w-4 h-4 inline mr-2" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    placeholder="Product you're interested in (optional)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Submit Query
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600">+1 (123) 456-7890</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Available 24/7 for emergencies
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">contact@company.com</p>
                    <p className="text-sm text-slate-500 mt-1">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Address
                    </h4>
                    <p className="text-slate-600">Vijaya Pharmaceuticals</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Visit us during business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-indigo-50 rounded-2xl">
                <h4 className="font-semibold text-slate-900 mb-3">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monday - Friday</span>
                    <span className="text-slate-900 font-medium">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday</span>
                    <span className="text-slate-900 font-medium">
                      9:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sunday</span>
                    <span className="text-slate-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 pb-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Our Location
                </h3>
                <p className="text-slate-600 mb-4">
                  Visit our store for in-person consultations and product
                  demonstrations.
                </p>
              </div>
              <div className="h-80 relative">
                <iframe
                  title="Vijaya Pharmaceuticals Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.753884963569!2d81.00677914917465!3d26.847779235828643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3c92dbd5387%3A0xc6704b601592e717!2svijaya%20pharmaceuticals!5e0!3m2!1sen!2sin!4v1723465170081!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-3xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Immediate Assistance?
          </h3>
          <p className="text-teal-50 mb-6 max-w-2xl mx-auto">
            For urgent medical queries or emergency prescription needs,
            don&apos;t hesitate to contact our 24/7 helpline. Our qualified
            pharmaceutical professionals are always ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+11234567890"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a
              href="mailto:contact@company.com"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuerySection;
