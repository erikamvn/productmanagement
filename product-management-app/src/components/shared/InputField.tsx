import React from "react";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number";
  required?: boolean;
  min?: number;
  step?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type,
  required = false,
  min,
  step,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
      min={min}
      step={step}
      aria-label={label}
    />
  </div>
);

export default InputField;
