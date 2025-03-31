import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Check, Send, Info, Calendar, User, Mail, Phone, MessageCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { plans } from "../content/siteContent.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.PROD
      ? "https://ju4m76xqr1.execute-api.eu-north-1.amazonaws.com/v1"
      : "/api"),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true 

});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error
      toast.error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Request made but no response
      toast.error('Unable to reach server. Please check your connection.');
    } else {
      // Error in request setup
      toast.error('Error sending request. Please try again.');
    }
    return Promise.reject(error);
  }
);

const CheckoutPage = () => {
  const location = useLocation();
  const initialFormState = {
    email: "",
    name: "",
    phone: "",
    query: "",
    startDate: null,
    plan: "",
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
      setFormData(prev => ({
        ...prev,
        plan: location.state.selectedPlan.name
      }));
    }
  }, [location]);

  const handlePlanChange = (e) => {
    const planName = e.target.value;
    setSelectedPlan(plans[planName]);
    setFormData((prev) => ({
      ...prev,
      plan: planName,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate fields as they change
    if (name === "phone") validatePhone(value);
    if (name === "email") validateEmail(value);
    if (name === "query") validateQuery(value);
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9][0-9]{9}$/;
    setErrors((prev) => ({
      ...prev,
      phone: !phoneRegex.test(value)
        ? "Phone number must start with 6, 7, 8, or 9 and be 10 digits long"
        : "",
    }));
  };

  const validateEmail = (value) => {
    if (!value) {
      setErrors(prev => ({
        ...prev,
        email: "Email is required"
      }));
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const popularDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    
    let error = "";
    if (!emailRegex.test(value)) {
      error = "Please enter a valid email address.";
    } else {
      const emailParts = value.split("@");
      if (emailParts.length > 1) {
        const emailDomain = emailParts[1];
        if (!popularDomains.includes(emailDomain)) {
          error = "The email domain seems uncommon. Please verify.";
        }
      }
    }

    setErrors((prev) => ({
      ...prev,
      email: error,
    }));
  };

  const validateQuery = (value) => {
    const maxLength = 200;
    setErrors((prev) => ({
      ...prev,
      query:
        value.length > maxLength
          ? `Query must be under ${maxLength} characters. (${value.length}/${maxLength})`
          : "",
    }));
  };

  const isFormValid = useMemo(() => {
    const { name, email, phone, plan, startDate } = formData;
    return (
      name &&
      email &&
      phone &&
      plan &&
      startDate &&
      !errors.phone &&
      !errors.email &&
      !errors.query
    );
  }, [formData, errors]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please complete all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { name, email, phone, plan, startDate, query } = formData;
      const response = await api.post(`/users/send-query`, {
        name,
        email,
        phone,
        plan,
        startDate,
        query,
      });

      if (response.status === 201) {
        toast.success("Query submitted successfully!");
        setFormData(initialFormState);
        setSelectedPlan(null);
      } else {
        throw new Error("Failed to submit query.");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-300 flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-8">
        <div className="w-full max-w-screen-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Send Your Query
          </h1>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Plan Selection and Details */}
            <div className="space-y-6">
              <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-2xl">
                <div className="flex items-center mb-4">
                  <Info className="mr-2 text-amber-500" size={24} />
                  <label className="text-lg font-medium text-white">
                    Select Your Plan
                  </label>
                </div>
                <select
                  value={formData.plan}
                  onChange={handlePlanChange}
                  className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ease-in-out"
                >
                  <option value="">Choose a plan</option>
                  {Object.keys(plans).map((planName) => (
                    <option key={planName} value={planName}>
                      {planName}
                    </option>
                  ))}
                </select>

                {selectedPlan && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <img
                        src={selectedPlan.image}
                        alt={selectedPlan.name}
                        className="w-full h-48 object-cover rounded-lg mb-4 transform hover:scale-105 transition duration-300"
                      />
                      <h3 className="text-xl font-semibold text-amber-500">
                        {selectedPlan.description}
                      </h3>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                        <Check className="mr-2 text-amber-500" size={20} />
                        Features Included:
                      </h4>
                      <ul className="space-y-2">
                        {selectedPlan.features.map((feature, index) => (
                          <li
                            key={`${feature}-${index}`}
                            className="flex items-center text-gray-300 hover:text-white transition"
                          >
                            <Check className="mr-2 text-amber-500" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-6 bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-2xl">
              <div className="space-y-4">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="mr-2 text-amber-500" size={16} />
                    Start Date *
                  </label>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ease-in-out"
                    placeholderText="Select a start date"
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <User className="mr-2 text-amber-500" size={16} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ease-in-out"
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Mail className="mr-2 text-amber-500" size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ease-in-out"
                  />
                  {errors.email && (
                    <div className="text-red-400 text-sm mt-2 animate-pulse">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <Phone className="mr-2 text-amber-500" size={16} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ease-in-out"
                  />
                  {errors.phone && (
                    <div className="text-red-400 text-sm mt-2 animate-pulse">
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <MessageCircle className="mr-2 text-amber-500" size={16} />
                    Any Questions? (Optional)
                  </label>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    placeholder="Enter any questions or special requirements"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300 ease-in-out resize-none"
                  />
                  <div className="text-sm mt-2 flex justify-between">
                    <span
                      className={`transition-colors duration-300 ${
                        formData.query.length > 200
                          ? "text-red-400 animate-pulse"
                          : "text-gray-400"
                      }`}
                    >
                      {200 - formData.query.length} characters remaining
                    </span>
                  </div>
                  {errors.query && (
                    <div className="text-red-400 text-sm mt-2 animate-pulse">
                      {errors.query}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className={`w-full text-white py-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center font-semibold text-lg ${
                  isFormValid && !isSubmitting
                    ? "bg-orange-500 hover:bg-orange-600 active:scale-95"
                    : "bg-gray-600 cursor-not-allowed opacity-50"
                }`}
              >
                <Send className="mr-2" size={20} />
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
