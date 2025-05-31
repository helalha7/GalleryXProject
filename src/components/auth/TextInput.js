'use client';

export default function TextInput({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = true,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 font-medium text-gray-700 dark:text-gray-300 transition-colors"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500
          bg-white text-[#111827] placeholder-gray-500 border-gray-300
          dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700
          transition-colors"
      />
    </div>
  );
}
