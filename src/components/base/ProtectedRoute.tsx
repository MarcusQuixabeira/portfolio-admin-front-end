import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useContext(UserContext)
  return (
    <>
      { !user ? <Navigate to={'/login'} replace/> : children }
    </>
  )
}