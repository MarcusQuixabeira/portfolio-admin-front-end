import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import ApiHandler from "../../api";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    async function fetchData() {
      const response = await ApiHandler.get('/verify_token')
      if (response.status === 401) {
        window.localStorage.removeItem('auth_token')
        navigate('/')
      }
    }
    fetchData()
  }, [location]);
  return (
    <>
      { children }
    </>
  )
}