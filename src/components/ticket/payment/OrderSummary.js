'use client';

/**
 * Component to display order summary and confirm payment details
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data with payment and billing info
 */
export default function OrderSummary({ formData }) {
  // Format card number to only show last 4 digits
  const maskedCardNumber = formData.cardNumber
    ? `•••• •••• •••• ${formData.cardNumber.slice(-4)}`
    : '';

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-lg">Virtual Museum Ticket</h4>
          <p className="text-gray-600 dark:text-gray-400">Full access to the GalleryX virtual museum experience</p>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <span>Ticket Price</span>
            <span className="font-semibold">$15.00</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span className="font-semibold">$1.50</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>$16.50</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <h4 className="font-semibold">Payment Method</h4>
        <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
          <div className="mr-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="14" x="2" y="5" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 10h20" />
            </svg>
          </div>
          <div>
            <p className="font-medium">{maskedCardNumber}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expires: {formData.expiryDate}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <h4 className="font-semibold">Billing Information</h4>
        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
          <p>{formData.fullName}</p>
          <p>{formData.email}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.zipCode}</p>
          <p>{formData.country}</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">
        <p className="text-sm flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          By clicking "Complete Purchase" you agree to our terms of service and acknowledge that your ticket is valid for 30 days from the date of purchase.
        </p>
      </div>
    </div>
  );
}