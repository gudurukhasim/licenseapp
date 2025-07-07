import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Box p={4} boxShadow={3} borderRadius={2} bgcolor="background.paper">
        <Typography variant="h5" fontWeight="bold" mb={3} align="center">
          Admin Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
