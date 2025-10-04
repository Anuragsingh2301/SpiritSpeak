import { useField } from 'formik';

const FormikInput = ({ 
  label, 
  helperText, 
  className = '',
  ...props 
}) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  // Define the teal/green error shades
  const errorBorderColor = 'border-[#0D968A]'; // Dark teal for border
  const errorTextColor = 'text-[#40916c]';    // Primary brand color for error text

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
      <input
        {...field}
        {...props}
        id={props.name}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none 
          // Focus ring is a dark teal color
          focus:ring-2 focus:ring-[#0D968A] 
          // Border is also set to a teal color on focus
          focus:border-[#11A697] 
          ${hasError ? errorBorderColor : 'border-gray-300'}
          ${className}
        `}
      />
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