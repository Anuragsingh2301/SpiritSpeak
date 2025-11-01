import { useField } from 'formik';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../../assets/icons';

const FormikInput = ({ 
  label, 
  helperText, 
  className = '',
  ...props 
}) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;
  const [showPassword, setShowPassword] = useState(false);

  // Check if this is a password input
  const isPasswordInput = props.type === 'password';

  // Define the teal/green error shades
  const errorBorderColor = 'border-[#0D968A]'; // Dark teal for border
  const errorTextColor = 'text-[#40916c]';    // Primary brand color for error text

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine the actual input type
  const inputType = isPasswordInput && showPassword ? 'text' : props.type;

  return (
    <div className="w-full">
      {/* The label is only rendered if provided */}
      {label && (
        <label 
          htmlFor={props.name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...field}
          {...props}
          type={inputType}
          id={props.name}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none 
            // Focus ring is a dark teal color
            focus:ring-2 focus:ring-[#0D968A] 
            // Border is also set to a teal color on focus
            focus:border-[#11A697] 
            ${hasError ? errorBorderColor : 'border-gray-300'}
            ${isPasswordInput ? 'pr-10' : ''}
            ${className}
          `}
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {hasError && (
        // 👇 CHANGED: Error text color to primary brand color
        <p className={`mt-1 text-xs ${errorTextColor}`}>{meta.error}</p>
      )}
      {helperText && !hasError && (
        // Helper text is set to the primary teal color
        <p className="mt-1 text-xs text-[#40916c]">{helperText}</p>
      )}
    </div>
  );
};

export default FormikInput;