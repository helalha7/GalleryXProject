'use client';

/**
 * Component for collecting billing information
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Function} props.onChange - Input change handler
 * @param {Object} props.errors - Validation errors
 */
export default function BillingInfoSection({ formData, onChange, errors }) {
  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'Brazil',
    'India',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Billing Information</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="John Doe"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.fullName 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="john.doe@example.com"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.email 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Billing Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="123 Main St"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.address 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
          )}
        </div>
        
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="New York"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.city 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
            )}
          </div>
          
          <div className="w-1/2">
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
              Zip/Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChange}
              placeholder="10001"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.zipCode 
                  ? 'border-red-500 dark:border-red-400' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={onChange}
            className={`w-full px-4 py-2 rounded-md border ${
              errors.country 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="" disabled>Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded">
        <p className="text-sm">
          <span className="font-medium">Note:</span> Your billing information must match your card details.
        </p>
      </div>
    </div>
  );
}