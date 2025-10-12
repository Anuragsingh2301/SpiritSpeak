import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/ui/FormikInput";
import LogoSVG from "../../assets/SVG.svg";
import { useRegisterMutation } from "../../apis/auth/AuthApiSlice";

const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();

  const [
    register,
    {
      isLoading: isRegistering,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/auth/login");
    }
  }, [isRegisterSuccess, navigate]);

  const handleSubmit = async (values) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0efeb] py-12 px-4 sm:px-6 lg:px-8">
      {/* Container/Card Adjustments:
        - Increased card height slightly to accommodate better internal spacing.
        - Used 'space-y-6' (down from 8) to slightly reduce the spacing between major blocks (logo block, form, link).
      */}
      <div className="w-[532px] h-[682px] space-y-6 bg-white p-8 rounded-lg shadow-lg">
        {/* Header Block Adjustments */}
        <img
          src={LogoSVG}
          alt="SpiritSpeak Logo"
          className="w-[112] h-[112] p-0 mx-auto mb-4" // Increased margin-bottom (mb-4) on logo
        />
        <h2 className=" text-center text-3xl p-0 m-0 font-bold text-[#40916c]">
          Begin Your Journey
        </h2>
        <h4 className="mt-2 text-center font-sans text-gray-500">
          Your daily space to reflect and grow.
        </h4>

        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4 space-y-6">
              {" "}
              {/* Reduced margin-top (mt-4) */}
              {/*
                Input Spacing:
                - Reduced vertical space between inputs from 'space-y-4' to 'space-y-3' for a tighter look without labels.
              */}
              <div className="space-y-3">
                <FormikInput
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                <FormikInput
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                <FormikInput
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  // Added mt-1 to helper text for proper spacing from the input
                  helperText={
                    <span className="mt-1">
                      Must contain uppercase, lowercase, and number
                    </span>
                  }
                  autoComplete="new-password"
                />

                <FormikInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
              {isRegisterError && (
                <div className="rounded-md bg-[#a8fed7] p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-[#25b977]">
                        {registerError.data?.message ||
                          "An error occurred during registration."}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={isRegistering || isSubmitting}
                className={`
                    w-[384px] 
                    h-[48px]
                    mx-auto 
                    mt-8 // Increased margin-top on the button for a clear break from inputs
                    rounded-lg 
                    font-semibold
                    text-white 
                    text-xl
                    flex items-center justify-center

                    // The Linear Gradient Class
                    bg-gradient-to-r from-[#14B7A5] via-[#11A697] to-[#0D968A]
                    
                    hover:opacity-90 transition
                    ${
                      isRegistering || isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }
                  `}
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>

        {/* Link Spacing: Added mt-8 to separate from the button visually */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-[#40916c] hover:text-[#225b41]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
