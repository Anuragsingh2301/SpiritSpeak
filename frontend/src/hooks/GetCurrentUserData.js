import { useGetCurrentUserQuery } from "../apis/auth/AuthApiSlice";

const GetCurrentUserData = () => {
  const {
    data: data,
    isLoading: isCheckingAuth,
    isError: authCheckError,
  } = useGetCurrentUserQuery();

  const isAuthenticated = data?.success || false;
  const currentUser = data?.user || null; 

  return { isAuthenticated, currentUser, isCheckingAuth, authCheckError };
};

export default GetCurrentUserData;