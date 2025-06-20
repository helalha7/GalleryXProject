'use client';

/**
 * Component for collecting credit card details
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Function} props.onChange - Input change handler
 * @param {Object} props.errors - Validation errors
 */
export default function CardDetailsSection({ formData, onChange, errors }) {
  // Format card number with spaces for readability
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    
    // Add spaces after every 4 digits
    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join(' ');
    }
    
    // Only allow up to 19 characters (16 digits + 3 spaces)
    if (value.length <= 19) {
      onChange({
        target: {
          name: 'cardNumber',
          value
        }
      });
    }
  };
  
  // Format expiry date as MM/YY
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 2) {
        value = value;
      } else {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
    }
    
    if (value.length <= 5) {
      onChange({
        target: {
          name: 'expiryDate',
          value
        }
      });
    }
  };
  
  // Only allow numbers for CVV and limit to 4 digits
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    onChange({
      target: {
        name: 'cvv',
        value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Payment Details</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.cardNumber 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardNumber}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="cardHolder" className="block text-sm font-medium mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={onChange}
            placeholder="John Doe"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.cardHolder 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.cardHolder && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardHolder}</p>
          )}
        </div>
        
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.expiryDate 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.expiryDate}</p>
            )}
          </div>
          
          <div className="w-1/2">
            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleCvvChange}
              placeholder="123"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.cvv 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cvv}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">
        <p className="text-sm">
          <span className="font-medium">Secure Payment:</span> Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}