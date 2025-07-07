// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CustomerForm from './pages/CustomerForm';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CustomerForm />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './pages/CustomerForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
