import React from "react";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  Control,
  Controller,
} from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

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
  control: Control<IFormValues>
  required?: boolean;
  type?: string;
  value?: string;
  placeholder?: string;
  error: FieldErrors<IFormValues>;
  textArea?: boolean;
  markdown?: boolean;
};

const Input = ({
  label,
  showLabel,
  register,
  control,
  required = false,
  type = "text",
  value,
  placeholder,
  error,
  textArea,
  markdown = false,
}: InputProps) => {
  const hasError = !!error[label];
  const message = error[label]?.message?.toString() || `${label} is required`;

  if (textArea && markdown) {
    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-1">
          {showLabel && (
            <label className="capitalize text-base font-semibold">
              {label}
            </label>
          )}
        </div>

        <Controller
          name={label}
          control={control}
          rules={required ? { required: `${label} is required` } : {}}
          render={({ field: { onChange, value: fieldValue } }) => (
            <div data-color-mode="light">
              <MDEditor
                value={fieldValue || ""}
                onChange={(val) => onChange(val || "")}
                preview="edit"
                hideToolbar={false}
                visibleDragbar={false}
                fullscreen={false}
                height={200}
                data-testid={`md-editor-${label}`}
                textareaProps={{
                  placeholder: placeholder || `Enter ${label} in markdown...`,
                  style: {
                    fontSize: 14,
                    lineHeight: 1.5,
                    fontFamily:
                      'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  },
                }}
              />
            </div>
          )}
        />

        {hasError && (
          <span className="capitalize text-sm text-red-500 mt-1 block">
            {message}
          </span>
        )}
      </div>
    );
  }

  // Handle regular textarea
  if (textArea) {
    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-1">
          {showLabel && (
            <label className="capitalize text-base font-semibold">
              {label}
            </label>
          )}
        </div>
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
        {hasError && (
          <span className="capitalize text-sm text-red-500">{message}</span>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <label className="capitalize text-base font-semibold">{label}</label>
        )}
      </div>
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
      {hasError && (
        <span className="capitalize text-sm text-red-500">{message}</span>
      )}
    </div>
  );
};

export default Input;