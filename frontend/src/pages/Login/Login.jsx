import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'; // 👈 Import useState
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../../components/ui/FormikInput';
import LogoSVG from '../../assets/SVG.svg';

// Simple Spinner Component (required for loading state on the button)
const Spinner = () => (
  <svg
    className="animate-spin h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = false;
  const authError = false;
  
  // 👇 New state to manage the button's loading visual
  const [localIsLoading, setLocalIsLoading] = useState(false); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (_values) => {
    // 1. Set local loading state to true
    setLocalIsLoading(true);

    try {
      // 2. Simulate API delay before navigating
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // 3. 👇 Navigate to the Dashboard
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login error:', error);
      // In a real app, you'd handle error UI here
    } finally {
      // 4. Reset loading state (only necessary if navigation fails or is prevented)
      setLocalIsLoading(false);
    }
  };

  // Combine Formik's submitting state with local loading state for the button
  const isButtonLoading = localIsLoading;

  const buttonClasses = `
    w-full
    h-[48px]
    mx-auto
    mt-4
    rounded-lg 
    font-semibold
    text-white 
    text-xl
    flex items-center justify-center
    bg-gradient-to-r from-[#14B7A5] via-[#11A697] to-[#0D968A]
    hover:opacity-90 transition
    ${isButtonLoading ? 'opacity-70 cursor-not-allowed' : ''}
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0efeb] py-12 px-4 sm:px-6 lg:px-8">     
      <div className=" w-[532px] h-[550px] space-y-8 bg-white p-8 rounded-lg shadow-lg  ">
        
          <img src={LogoSVG} alt="SpiritSpeak Logo" className='w-[112] h-[112] p-0 mx-auto mb-2' />
          <h2 className=" text-center text-3xl p-0 m-0 font-bold text-[#40916c]">
            SpiritSpeak
          </h2>
          <h4 className='mt-2 text-center text-bold font-sans text-gray-500'>
            Your daily space to reflect and grow.
          </h4>
        
        
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 mx-3 space-y-6">
              <div className="space-y-4">
                <FormikInput
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                
                <FormikInput
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              {authError && (
                <div className="rounded-md bg-[#a8fed7] p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-[#25b977]">
                        {authError}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              <button
                  type="submit"
                  className={buttonClasses}
                  disabled={isButtonLoading}
                >
                  {/* Conditional rendering for loading state */}
                  {isButtonLoading ? <Spinner /> : "Let's Begin"}
            </button>
            </Form>
          )}
        </Formik>
         <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?
            <Link 
              to="/auth/register" 
              className="font-medium text-[#40916c] hover:text-[#225b41]"
            >
              Sign Up
            </Link>
          </p>
      </div>
    </div>
  );
};

export default Login;