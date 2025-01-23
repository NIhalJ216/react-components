import React from "react";
import { Container } from "@mui/material";
import MyAppbar from "../Components/DashboardLayout/MyAppbar";
import RoutePaths from "../Routings/RoutePaths";

function LandingPage() {
  return (
    <>
      <MyAppbar />
      <Container maxWidth="xl">
        <RoutePaths />
      </Container>
    </>
  );
}

export default LandingPage;
