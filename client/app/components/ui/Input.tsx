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
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error: FieldErrors<IFormValues>;
  textArea?: boolean;
};

const Input = ({
  label,
  register,
  required = false,
  type = "text",
  placeholder,
  error,
  textArea,
}: InputProps) => {
  const hasError = !!error[label];
  const message = error[label]?.message?.toString() || `${label} is required`;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1">
        <label className="capitalize text-base font-semibold">{label}</label>
        {hasError && (
          <span className="capitalize text-sm text-red-500">{message}</span>
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
          type={type}
          placeholder={placeholder}
          {...register(
            label,
            required ? { required: `${label} is required` } : {}
          )}
        />
      )}
    </div>
  );
};

export default Input;
