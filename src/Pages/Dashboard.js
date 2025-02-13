import { Grid } from "@mui/material";
import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("UserDetails"));
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Welcome {user.userName}</h1>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
