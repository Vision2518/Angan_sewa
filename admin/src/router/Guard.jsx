import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useVerifyTokenQuery } from "../redux/features/authSlice";
import { clearUser } from "../redux/features/authState";
import { useEffect } from "react";
const Guard = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useVerifyTokenQuery();
  const expDate = new Date(data?.user.exp * 1000);
  const initDate = new Date(data?.user.iat * 1000);
   console.log(expDate);
   console.log(initDate);
  useEffect(() => {
    if (data?.user?.exp) {
      const currentTime = Date.now();
      const tokenExpTime = data.user.exp * 1000;
      const isExpired = tokenExpTime < currentTime;
      if (isExpired) {
        dispatch(clearUser);
      }
    }
  }, [data, error, dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuth ? children : <Navigate to="/" />;
};
export default Guard;
