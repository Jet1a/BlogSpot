import React from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

export interface IFormValues {
  name?: string;
  email?: string;
  password?: string;
  title?: string;
  imageUrl?: string;
  content?: string;
}

type InputProps = {
  label: Path<IFormValues>;
  showLabel?: boolean;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  type?: string;
  value?: string;
  placeholder?: string;
  error: FieldErrors<IFormValues>;
  textArea?: boolean;
};

const Input = ({
  label,
  showLabel,
  register,
  required = false,
  type = "text",
  value,
  placeholder,
  error,
  textArea,
}: InputProps) => {
  const hasError = !!error[label];
  const message = error[label]?.message?.toString() || `${label} is required`;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <label className="capitalize text-base font-semibold">{label}</label>
        )}
      </div>
      {textArea ? (
        <textarea
          rows={6}
          className={`border rounded-lg py-2 px-4 w-full focus:outline-1 ${
            hasError
              ? "border-red-500 outline-red-500"
              : "border-slate-200 outline-blue-500"
          }`}
          {...register(
            label,
            required ? { required: `${label} is required` } : {}
          )}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`border rounded-lg py-2 px-4 w-full focus:outline-1 ${
            hasError
              ? "border-red-500 outline-red-500"
              : "border-slate-200 outline-blue-500"
          }`}
          value={value}
          type={type}
          placeholder={placeholder}
          {...register(
            label,
            required ? { required: `${label} is required` } : {}
          )}
        />
      )}
      {hasError && (
        <span className="capitalize text-sm text-red-500">{message}</span>
      )}
    </div>
  );
};

export default Input;
