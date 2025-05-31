'use client';

export default function StyledTextInput({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = true,
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 
        text-[#111827] dark:text-white
        bg-white dark:bg-gray-800 
        border border-gray-300 dark:border-gray-600 
        rounded-xl 
        placeholder-gray-500 dark:placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
        transition-all duration-200"
    />
  );
}
