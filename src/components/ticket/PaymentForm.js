'use client';

import { useState } from 'react';
import CardDetailsSection from './payment/CardDetailsSection';
import BillingInfoSection from './payment/BillingInfoSection';
import OrderSummary from './payment/OrderSummary';
import { purchaseTicket } from '@/lib/api/ticket';
import { updateUserTicketInSession } from '@/utils/sessionStorageHandler';

/**
 * Main payment form component that handles the full payment process
 * @param {Object} props - Component props
 * @param {string} props.token - User authentication token
 * @param {Function} props.onSuccess - Callback function to execute after successful payment
 */
export default function PaymentForm({ token, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Card details
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    
    // Billing info
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      // Validate card details
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        errors.cardNumber = 'Invalid card number format';
      
      if (!formData.cardHolder.trim()) errors.cardHolder = 'Cardholder name is required';
      
      if (!formData.expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) 
        errors.expiryDate = 'Use MM/YY format';
      
      if (!formData.cvv.trim()) errors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = 'Invalid CVV';
    } 
    
    if (step === 2) {
      // Validate billing information
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.zipCode.trim()) errors.zipCode = 'Zip code is required';
      if (!formData.country.trim()) errors.country = 'Country is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // This function is explicitly called when the Complete Purchase button is clicked
  const completePurchase = async (e) => {
    e.preventDefault();
    
    // Check if already in loading or success state
    if (loading || success) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Process payment (this would connect to a payment gateway in a real app)
      // For this example, we'll just simulate a successful payment
      
      // Purchase the ticket after payment is successful
      const ticket = await purchaseTicket(token);
      
      // Update session storage with the ticket
      updateUserTicketInSession(ticket);
      
      // Mark as successful
      setSuccess(true);
      
      // Call the success callback
      onSuccess(ticket);
      
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-display font-bold mb-6 text-center">
        Complete Your Purchase
      </h2>
      
      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        <div 
          className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
            ${currentStep >= 1 ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            1
          </div>
          <span className="text-sm">Payment Details</span>
        </div>
        
        <div className="flex-1 flex items-center">
          <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
        </div>
        
        <div 
          className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
            ${currentStep >= 2 ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            2
          </div>
          <span className="text-sm">Billing Information</span>
        </div>
        
        <div className="flex-1 flex items-center">
          <div className={`h-1 flex-1 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
        </div>
        
        <div 
          className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
            ${currentStep >= 3 ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
            3
          </div>
          <span className="text-sm">Review & Pay</span>
        </div>
      </div>
      
      <div>
        {currentStep === 1 && (
          <CardDetailsSection 
            formData={formData}
            onChange={handleInputChange}
            errors={validationErrors}
          />
        )}
        
        {currentStep === 2 && (
          <BillingInfoSection 
            formData={formData}
            onChange={handleInputChange}
            errors={validationErrors}
          />
        )}
        
        {currentStep === 3 && (
          <OrderSummary formData={formData} />
        )}
        
        {/* Form navigation */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={loading || success}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Back
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="button" // Changed from submit to button
              onClick={completePurchase} // Explicitly call completePurchase on click
              disabled={loading || success}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : success ? 'Purchase Complete' : 'Complete Purchase'}
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
          <p className="font-medium">Your ticket has been purchased successfully!</p>
          <p className="text-sm mt-1">You will be redirected to your ticket page shortly.</p>
        </div>
      )}
    </div>
  );
}