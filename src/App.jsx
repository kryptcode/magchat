import Room from "./pages/room"
import Login from "./pages/login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./components/PrivateRoutes"
import { AuthProvider } from "./utils/AuthContext"
import Register from "./pages/register"


function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
