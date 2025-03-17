import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  Send,
  Info,
  Calendar,
  User,
  Mail,
  Phone,
  MessageCircle,
  Loader,
} from "lucide-react";
import DatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { plans } from "../content/siteContent.js";

// Create API instance with proper configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.PROD
      ? "https://ju4m76xqr1.execute-api.eu-north-1.amazonaws.com/v1"
      : "/api"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      // Server responded with error
      toast.error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      // Request made but no response
      toast.error("Unable to reach server. Please check your connection.");
    } else {
      // Error in request setup
      toast.error("Error sending request. Please try again.");
    }
    return Promise.reject(error);
  }
);

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    name: "",
    phone: "",
    email: "",
    query: "",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set selected plan from location state if available
  useEffect(() => {
    if (location.state?.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
      setFormData((prev) => ({
        ...prev,
        plan: location.state.selectedPlan.name,
      }));
    }
  }, [location]);

  // Handle plan selection change
  const handlePlanChange = (e) => {
    const planName = e.target.value;
    if (!planName) {
      setSelectedPlan(null);
      setFormData((prev) => ({ ...prev, plan: "" }));
      return;
    }
    
    const plan = plans[planName];
    if (plan) {
      setSelectedPlan(plan);
      setFormData((prev) => ({ ...prev, plan: planName }));
    } else {
      toast.error("Selected plan not found. Please try again.");
    }
  };

  // Generic input change handler with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Date selection handler
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
    validateField("startDate", date);
  };

  // Centralized field validation
  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required";
        } else if (value.trim().length < 2) {
          errorMessage = "Name must be at least 2 characters";
        }
        break;
        
      case "phone":
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!value) {
          errorMessage = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          errorMessage = "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits";
        }
        break;
        
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = "Email is required";
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
        
      case "query":
        const maxQueryLength = 200;
        if (value && value.length > maxQueryLength) {
          errorMessage = `Query must be under ${maxQueryLength} characters (${value.length}/${maxQueryLength})`;
        }
        break;
        
      case "startDate":
        if (!value) {
          errorMessage = "Start date is required";
        }
        break;
        
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
    
    return !errorMessage;
  };

  // Validate all form fields at once
  const validateForm = () => {
    const fields = ["name", "email", "phone", "startDate"];
    let isValid = true;
    
    fields.forEach(field => {
      const value = formData[field];
      const fieldValid = validateField(field, value);
      if (!fieldValid) isValid = false;
    });
    
    // Validate optional fields only if they have content
    if (formData.query) {
      const queryValid = validateField("query", formData.query);
      if (!queryValid) isValid = false;
    }
    
    // Check if plan is selected
    if (!formData.plan) {
      setErrors(prev => ({ ...prev, plan: "Please select a plan" }));
      isValid = false;
    }
    
    return isValid;
  };

  // Check if form is valid without triggering validation messages
  const isFormValid = useMemo(() => {
    const { name, email, phone, plan, startDate, query } = formData;
    const requiredFields = name && email && phone && plan && startDate;
    const noErrors = !Object.values(errors).some(error => error);
    
    // For query, only consider it if it has content
    const queryValid = !query || (query && !errors.query);
    
    return requiredFields && noErrors && queryValid;
  }, [formData, errors]);

  // Form submission handler
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please complete all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { name, email, phone, plan, startDate, query } = formData;
      const response = await api.post("/users/send-query", { // Fixed endpoint path
        name,
        email,
        phone,
        plan,
        startDate: startDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        query,
      });

      if (response.status === 201) {
        toast.success("Query submitted successfully!");
        setFormSubmitted(true);
        setFormData(initialFormState);
        // Redirect after successful submission (optional)
        setTimeout(() => navigate("/thank-you", { state: { planName: plan } }), 2000);
      } else {
        throw new Error("Failed to submit query.");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form handler
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSelectedPlan(null);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-
