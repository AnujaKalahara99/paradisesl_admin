import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid2 as Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";

const ApplicationDetailPage = ({ applicantId }) => {
  const [applicant, setApplicant] = useState({
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    country: "United Stated of America",
    email: "johndoe@example.com",
    mobileNo: "1234567890",
    photoUrl: "https://example.com/photo.jpg",
  });

  //   useEffect(() => {
  //     const fetchApplicant = async () => {
  //       try {
  //         const response = await axios.get(`/api/applicants/${applicantId}`);
  //         setApplicant(response.data);
  //       } catch (error) {
  //         console.error('Error fetching applicant details:', error);
  //       }
  //     };

  //     fetchApplicant();
  //   }, [applicantId]);

  const handleApprove = async () => {
    // try {
    //   await axios.post(`/api/applicants/${applicantId}/approve`);
    //   alert('Application approved.');
    // } catch (error) {
    //   console.error('Error approving application:', error);
    // }
  };

  const handleReject = async () => {
    // try {
    //   await axios.post(`/api/applicants/${applicantId}/reject`);
    //   alert('Application rejected.');
    // } catch (error) {
    //   console.error('Error rejecting application:', error);
    // }
  };

  if (!applicant) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Application Details
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={applicant.photoUrl}
          alt={`${applicant.firstName} ${applicant.lastName}`}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Given Name"
                value={applicant.firstName}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Surname"
                value={applicant.lastName}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                value={new Date(applicant.dateOfBirth).toLocaleDateString()}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Place of Birth"
                value={applicant.country}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={applicant.email}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile No"
                value={applicant.mobileNo}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            {/* Add other fields as necessary */}
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={2} justifyContent="center" marginTop={2}>
        <Grid item>
          <Button variant="contained" color="success" onClick={handleApprove}>
            Approve
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error" onClick={handleReject}>
            Reject
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApplicationDetailPage;
