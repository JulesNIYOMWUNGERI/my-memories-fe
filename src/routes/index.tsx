import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import PostDetails from "../pages/PostDetails/PostDetails";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Layout = () => {
  const user = useSelector((state: RootState) => state.signin.data);
  
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Outlet />
    </Container>
  );
};


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.signin.data);
  return user?.userInfo ? <Navigate to="/posts" /> : children;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/posts" />,
      },
      {
        path: '/posts',
        element: <Home />,
      },
      {
        path: '/posts/search',
        element: <Home />,
      },
      {
        path: "/auth",
        element: (
          <ProtectedRoute>
            <Auth />
          </ProtectedRoute>
        ),
      },
      {
        path: '/posts/:id',
        element: <PostDetails />,
      },
    ]
  }
]);

export default router;
