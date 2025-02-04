import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check, Send } from "lucide-react";
import DatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { plans } from "../content/siteContent.js";

const CheckoutPage = () => {
  const location = useLocation();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    query: "",
    startDate: null,
    plan: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    query: "",
  });

  useEffect(() => {
    if (location.state?.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
      setFormData((prev) => ({
        ...prev,
        plan: location.state.selectedPlan.name,
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const popularDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    const emailDomain = value.split("@")[1];

    let error = "";
    if (!emailRegex.test(value)) {
      error = "Please enter a valid email address.";
    } else if (emailDomain && !popularDomains.includes(emailDomain)) {
      error = "The email domain seems uncommon. Please verify.";
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

  const handleSubmit = async () => {
    const { name, email, phone, plan, startDate, query } = formData;

    if (!name || !email || !phone || !plan || !startDate) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (errors.phone || errors.email || errors.query) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      toast.loading("Processing...");
      const response = await axios.post("/api/users/send-query", {
        name,
        email,
        phone,
        plan,
        startDate,
        query,
      });

      if (response.status === 201) {
        toast.dismiss();
        toast.success("Query submitted successfully!");
        setFormData({
          email: "",
          name: "",
          phone: "",
          query: "",
          startDate: null,
          plan: formData.plan,
        });
      } else {
        throw new Error("Failed to submit query.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error submitting query:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-8">
        <div className="w-full max-w-screen-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Complete Your Subscription
          </h1>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Plan Selection and Details */}
            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <label className="block text-lg font-medium text-white mb-4">
                  Select Your Plan
                </label>
                <select
                  value={formData.plan}
                  onChange={handlePlanChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
                >
                  <option value="">Choose a plan</option>
                  {Object.keys(plans).map((planName) => (
                    <option key={planName} value={planName}>
                      {planName}
                    </option>
                  ))}
                </select>

                {selectedPlan && (
                  <div className="space-y-4">
                    <div>
                      <img
                        src={selectedPlan.image}
                        alt={selectedPlan.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold text-amber-500">
                        {selectedPlan.description}
                      </h3>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">
                        Features Included:
                      </h4>
                      <ul className="space-y-2">
                        {selectedPlan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center text-gray-300"
                          >
                            <Check className="mr-2 text-amber-500" size={20} />
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
            <div className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholderText="Select a start date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.email && (
                    <div className="text-red-400 text-sm mt-2">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.phone && (
                    <div className="text-red-400 text-sm mt-2">
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Any Questions? (Optional)
                  </label>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    placeholder="Enter any questions or special requirements"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                  <div className="text-sm mt-2">
                    <span
                      className={
                        formData.query.length > 200
                          ? "text-red-400"
                          : "text-gray-400"
                      }
                    >
                      {200 - formData.query.length} characters remaining
                    </span>
                  </div>
                  {errors.query && (
                    <div className="text-red-400 text-sm mt-2">
                      {errors.query}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition flex items-center justify-center font-semibold text-lg"
              >
                <Send className="mr-2" size={20} />
                Complete Subscription
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
