import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, id, ...rest }: InputProps) => {
  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input id={id} className="w-full p-2 border rounded" {...rest} />
    </div>
  );
};

export default Input;
