import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { testApi } from "../Services/TestServices";

function About() {
  const getEmployees = async () => {
    const res = await testApi();
    console.log("RES", res);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>About</h1>
      </Grid>
    </Grid>
  );
}

export default About;
