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
      <label htmlFor={id} className="block mb-2 font-medium text-gray-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
