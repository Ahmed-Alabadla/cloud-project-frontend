import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { userDataContext } from "../context";
import LayoutAdmin from "../layout/LayoutAdmin";

interface TypeChildren {
  children: ReactNode;
}
const ProtectedAdmin = () => {
  const userContext = useContext(userDataContext);
  if (userContext?.userData?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <LayoutAdmin~ />;
};

const ProtectedUser = ({ children }: TypeChildren) => {
  const userContext = useContext(userDataContext);

  const userData = userContext?.userData;
  if (userData) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export { ProtectedAdmin, ProtectedUser };
