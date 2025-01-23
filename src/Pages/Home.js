import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DEPARTMENTS, SECTORS, GENDER } from "../Utils/Constants";

function Home() {
  dayjs.extend(utc);
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    address: "",
    department: "",
    sector: "",
    gender: "",
    label: false,
    required: false,
    disabled: false,
    datePicker: dayjs(),
    datePickerString: dayjs().utc().format("DD-MM-YYYY HH:mm:ss"),
    moblieDatePicker: dayjs(),
    moblieDatePickerString: dayjs().utc().format("DD-MM-YYYY HH:mm:ss"),
  });

  const updatePayload = (pairs) => setPayload({ ...payload, ...pairs });

  const handleChange = (key, val) => {
    console.log("KEYVAL", key, val);
    if (key === "datePicker") {
      console.log("date", val.utc().format("DD-MM-YYYY HH:mm:ss"));
      updatePayload({
        [key]: val,
        datePickerString: val.utc().format("DD-MM-YYYY HH:mm:ss"),
      });
    } else if (key === "moblieDatePicker") {
      updatePayload({
        [key]: val,
        moblieDatePickerString: val.utc().format("DD-MM-YYYY HH:mm:ss"),
      });
    } else {
      updatePayload({ [key]: val });
    }
  };
  console.log("Payload", payload);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Personal Details
        </Typography>
      </Grid>
      <Container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                id="firstName"
                fullWidth
                size="small"
                variant="outlined"
                value={payload.firstName}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                id="lastName"
                fullWidth
                size="small"
                variant="outlined"
                value={payload.lastName}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                id="address"
                fullWidth
                size="small"
                multiline
                // maxRows={3}
                rows={3}
                variant="outlined"
                value={payload.address}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Department"
                name="department"
                fullWidth
                size="small"
                select
                variant="outlined"
                value={payload.department}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {DEPARTMENTS.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="sector"
                options={SECTORS}
                // onInputChange={(e, newInputValue, reason) =>
                //   handleChange(e.target.id, e.target.value)
                // }
                onChange={(event, newValue) =>
                  handleChange("sector", newValue ? newValue.id : "")
                }
                getOptionLabel={(option) => option?.name || ""}
                renderInput={(params) => (
                  <TextField {...params} label="Sector" size="small" />
                )}
                renderOption={(props, option) => {
                  const { key, ...restProps } = props;
                  return (
                    <Box
                      component="li"
                      key={option.id}
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...restProps}
                      style={{ fontSize: "0.8rem" }}
                    >
                      {option.name}
                    </Box>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  // defaultValue="female"
                  name="gender"
                  row
                  value={payload.gender}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                >
                  {GENDER.map((gend, ind) => (
                    <FormControlLabel
                      key={ind}
                      value={gend.value}
                      control={<Radio />}
                      label={gend.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>Checkbox</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // defaultChecked
                        id="label"
                        checked={payload.label}
                        onChange={(e) =>
                          handleChange(e.target.id, e.target.checked)
                        }
                      />
                    }
                    label="Label"
                  />
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        id="required"
                        checked={payload.required}
                        onChange={(e) =>
                          handleChange(e.target.id, e.target.checked)
                        }
                      />
                    }
                    label="Required"
                  />
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        id="disabled"
                        checked={payload.disabled}
                        onChange={(e) =>
                          handleChange(e.target.id, e.target.checked)
                        }
                      />
                    }
                    label="Disabled"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic date picker"
                  value={payload.datePicker}
                  onChange={(newValue) => handleChange("datePicker", newValue)}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      style: { width: 300 },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Mobile date picker"
                  value={payload.moblieDatePicker}
                  onChange={(newValue) =>
                    handleChange("moblieDatePicker", newValue)
                  }
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      style: { width: 300 },
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <EventIcon sx={{ cursor: "pointer" }} />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Home;
