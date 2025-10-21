import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/ui/FormikInput";
import LogoSVG from "../../assets/SVG.svg";
import { FaSpinner } from "react-icons/fa";
import {
  useLoginMutation,
} from "../../apis/auth/AuthApiSlice";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

//this is the login page


const Login = () => {
  const navigate = useNavigate();

  const [
    login, 
    { 
      isLoading: isLoginLoading, 
      isError: isLoginError, 
      error: loginError,
      isSuccess: isLoginSuccess
    }
  ] = useLoginMutation();

  // Handle successful login
  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/dashboard");
    }
  }, [isLoginSuccess, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values).unwrap();
      // Navigation handled by useEffect hook when isLoginSuccess becomes true
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific field errors if provided by the API
      if (error.data?.errors) {
        Object.keys(error.data.errors).forEach(field => {
          setFieldError(field, error.data.errors[field]);
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0efeb] py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-[532px] h-[550px] space-y-8 bg-white p-8 rounded-lg shadow-lg  ">
        <img
          src={LogoSVG}
          alt="SpiritSpeak Logo"
          className="w-[112] h-[112] p-0 mx-auto mb-2"
        />
        <h2 className=" text-center text-3xl p-0 m-0 font-bold text-[#40916c]">
          SpiritSpeak
        </h2>
        <h4 className="mt-2 text-center text-bold font-sans text-gray-500">
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

              {isLoginError && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {loginError?.data?.message || "Login failed. Please try again."}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full h-[48px] mx-auto mt-4 rounded-lg font-semibold text-white text-xl flex items-center justify-center bg-gradient-to-r from-[#14B7A5] via-[#11A697] to-[#0D968A] hover:opacity-90 transition-opacity duration-200 ${
                  isLoginLoading || isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoginLoading || isSubmitting}
              >
                {isLoginLoading || isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Let's Begin"
                )}
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
