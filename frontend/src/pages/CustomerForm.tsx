import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    dob: '',
    address: '',
  });

  const [files, setFiles] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    if (age < 18) return alert('Age must be at least 18');

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    Object.entries(files).forEach(([k, v]) => data.append(k, v));

    try {
      const res = await axios.post('/api/submissions', data);
      alert(`Submitted! Your ID: ${res.data.submissionId}`);
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        dob: '',
        address: '',
      });
      setFiles({});
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          License Application
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              fullWidth
            />

            <TextField
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              fullWidth
            />

            <TextField
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              multiline
              rows={3}
              fullWidth
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Aadhaar Card
              </Typography>
              <input
                type="file"
                onChange={(e) =>
                  setFiles({ ...files, aadhaar: e.target.files![0] })
                }
                required
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Photograph
              </Typography>
              <input
                type="file"
                onChange={(e) =>
                  setFiles({ ...files, photograph: e.target.files![0] })
                }
                required
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Signature
              </Typography>
              <input
                type="file"
                onChange={(e) =>
                  setFiles({ ...files, signature: e.target.files![0] })
                }
                required
              />
            </Box>

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default CustomerForm;
