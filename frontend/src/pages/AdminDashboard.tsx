import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Modal,
  Paper,
} from '@mui/material';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123'; // Replace with secure method in prod
const basicAuthHeader = 'Basic ' + btoa(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`);

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('/api/admin', {
        headers: { Authorization: basicAuthHeader },
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await axios.put(
        `/api/admin/${id}`,
        { status },
        { headers: { Authorization: basicAuthHeader } }
      );
      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === id ? res.data : sub))
      );
      alert('Status updated');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const handleClose = () => setSelectedSubmission(null);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {submissions.length === 0 ? (
        <Typography>No submissions found.</Typography>
      ) : (
        submissions.map((sub) => (
          <Box
            key={sub._id}
            sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}
          >
            <Typography>
              <strong>Name:</strong> {sub.fullName}
            </Typography>
            <Typography>
              <strong>Status:</strong> {sub.status}
            </Typography>
            <Typography>
              <strong>Submitted:</strong>{' '}
              {new Date(sub.timestamp).toLocaleString()}
            </Typography>

            <Stack direction="row" spacing={1} mt={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => updateStatus(sub._id, 'Approved')}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => updateStatus(sub._id, 'Rejected')}
              >
                Reject
              </Button>
              <Button variant="outlined" onClick={() => setSelectedSubmission(sub)}>
                View Details
              </Button>
            </Stack>
          </Box>
        ))
      )}

      {/* Modal for details */}
      <Modal
        open={!!selectedSubmission}
        onClose={handleClose}
        aria-labelledby="submission-details-title"
        aria-describedby="submission-details-description"
      >
        <Paper sx={styleModal}>
          {selectedSubmission && (
            <>
              <Typography
                id="submission-details-title"
                variant="h5"
                gutterBottom
              >
                Submission Details
              </Typography>
              <Typography>
                <strong>Name:</strong> {selectedSubmission.fullName}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedSubmission.phoneNumber}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedSubmission.email}
              </Typography>
              <Typography>
                <strong>Date of Birth:</strong>{' '}
                {new Date(selectedSubmission.dob).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Address:</strong> {selectedSubmission.address}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedSubmission.status}
              </Typography>

              <Typography sx={{ mt: 2, mb: 1 }}>
                <strong>Documents:</strong>
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Box>
                  <Typography>Aadhaar Card:</Typography>
                  <img
                    src={`/uploads/${selectedSubmission.documents.aadhaar}`}
                    alt="Aadhaar Card"
                    style={{ maxWidth: 180, maxHeight: 120, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Typography>Photograph:</Typography>
                  <img
                    src={`/uploads/${selectedSubmission.documents.photograph}`}
                    alt="Photograph"
                    style={{ maxWidth: 180, maxHeight: 120, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Typography>Signature:</Typography>
                  <img
                    src={`/uploads/${selectedSubmission.documents.signature}`}
                    alt="Signature"
                    style={{ maxWidth: 180, maxHeight: 120, borderRadius: 4 }}
                  />
                </Box>
              </Stack>

              <Box mt={3} textAlign="right">
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
