import React from "react";
import { Grid } from "@mui/material";
import "../Styles/Styles.scss";
// import DashboardBg from "../Assets/Images/backgrounds/DashboardBg.jpg";
import AdminDash from "./Dashboard/AdminDash";
import CustomerDash from "./Dashboard/CustomerDash";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("UserDetails"));

  return (
    <Grid container spacing={2}>
      {/* <Box
        className="ImgBox"
        sx={{
          backgroundImage: `url(${DashboardBg})`,
        }}
      /> */}
      <Grid item xs={12}>
        <h1>Welcome {user.userName}</h1>
      </Grid>
      {user.role === "ADMIN" ? <AdminDash /> : <CustomerDash />}
    </Grid>
  );
}

export default Dashboard;
