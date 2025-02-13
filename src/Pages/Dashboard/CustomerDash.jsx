import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function CustomerDash() {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Small Tiffin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 Roti and Bhaji
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Medium Tiffin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 Roti, Dal, Rice
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Large Tiffin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3 Roti, 2 Bhaji, Dal, Rice
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomerDash;
