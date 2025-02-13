import React from "react";
import { Container } from "@mui/material";
import MyAppbar from "../Components/DashboardLayout/MyAppbar";
import RoutePaths from "../Routings/RoutePaths";
import { useLocation } from "react-router-dom";
import { PATHS } from "../Routings/Paths";

function LandingPage() {
  const location = useLocation();

  // Define public routes (paths where MyAppbar should be shown)
  const publicRoutes = [PATHS.LOGIN, PATHS.REGISTER, PATHS.FORGOT_PASSWORD];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  return (
    <>
      {!isPublicRoute && <MyAppbar />}
      {/* Show Appbar only for protected routes */}
      <Container maxWidth="xl">
        <RoutePaths />
      </Container>
    </>
  );
}

export default LandingPage;
