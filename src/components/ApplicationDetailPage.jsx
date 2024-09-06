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
import { ApiClient } from "adminjs";

const ApplicationDetailPage = ({ applicantId }) => {
  const api = new ApiClient();

  //   const [applicant, setApplicant] = useState({
  //     firstName: "John",
  //     lastName: "Doe",
  //     dateOfBirth: "1990-01-01",
  //     country: "United Stated of America",
  //     email: "johndoe@example.com",
  //     mobileNo: "1234567890",
  //     photoUrl: "https://example.com/photo.jpg",
  //   });

  const [applicants, setApplicants] = useState([]);
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get(`/api/applicants`);
        setApplicants(response.data);
        setApplicant(response.data[0]);
      } catch (error) {
        console.error("Error fetching applicant details:", error);
      }
    };

    fetchApplicant();
  }, [applicantId]);

  const handleApprove = async () => {
    // try {
    //   await axios.post(`/api/applicants/${applicantId}/approve`);
    //   alert('Application approved.');
    // } catch (error) {
    //   console.error('Error approving application:', error);
    // }
    try {
      await axios.post(`/api/check`, {
        firstName: applicant.givenName,
        lastName: applicant.surname,
        countryCode: "HT",
        sex: "M",
        applicantId: 1,
      });
      alert("Application approved.");
    } catch (error) {
      console.error("Error approving application:", error);
    }
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
        Applicant Details
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="300"
          width="300"
          image={applicant.photoUrl}
          alt={`${applicant.givenName} ${applicant.surname}`}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Given Name"
                value={applicant.givenName}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Surname"
                value={applicant.surname}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Date of Birth"
                value={new Date(applicant.dateOfBirth).toLocaleDateString()}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Place of Birth"
                value={applicant.placeOfBirth}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Email"
                value={applicant.email}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Mobile No"
                value={applicant.mobileNo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Martial Status"
                value={applicant.martialStatus}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Passport No"
                value={applicant.passportNo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Passport Expiry Date"
                value={new Date(
                  applicant.passportDateOfExpiry
                ).toLocaleDateString()}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Place of Issue"
                value={applicant.placeOfIssue}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Occupation"
                value={applicant.occupation}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Home Address"
                value={applicant.homeAddress}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                value={applicant.emergencyConName}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Emergency Contact No"
                value={applicant.emergencyConNo}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Has Visited Before"
                value={applicant.hasVisitedBefore ? "Yes" : "No"}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Last Visited Date"
                value={
                  applicant.lastVisitedDate
                    ? new Date(applicant.lastVisitedDate).toLocaleDateString()
                    : "N/A"
                }
                InputProps={{ readOnly: true }}
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
