import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    const authToken = window.localStorage.getItem('auth_token')
    if (!authToken) {
      navigate("/login")
    }
  }, [location]);
  return (
    <>
      { children }
    </>
  )
}