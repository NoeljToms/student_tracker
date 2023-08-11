import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Student from './pages/Students.js';
import StudentInfo from './pages/StudentInfo.js';
import Navbar from './components/Navbar.js';
import NewStudent from './pages/NewStudent.js';
import EditStudent from './pages/EditStudent.js';
import Billing from './pages/Billing.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";


function App() {
  const { user } = useAuthContext()
  const { logout } = useLogout();

  useEffect(() => {
    const tokenExpired = user ? checkTokenExpiration(user.token) : true

    if (tokenExpired) {
      // Token has expired, clear token and redirect to login
      logout()
    }

  },[user])

  function checkTokenExpiration(token) {
    if (!token) return true; // No token means logged out
    try {
      const decodedToken = jwt_decode(token);
      console.log("Decoded Token: ",decodedToken, " current Time:", Date.now() / 1000)
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // Error in decoding means token is invalid
    }
  }


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="/register"/>} />
        <Route path='/students' element={user ?<Student/>: <Navigate to="/register"/>} />
        <Route path='/students/:id' element={user ?<StudentInfo/>: <Navigate to="/register"/>} />
        <Route path='/newstudent' element={user ?<NewStudent />: <Navigate to="/register"/>} />
        <Route path='/billing' element={user ?<Billing/>: <Navigate to="/register"/>} />
        <Route path='/editstudent/:id' element={user ?<EditStudent/>: <Navigate to="/register"/>} />
        <Route path='/register' element={!user ?<Signup/>: <Navigate to="/"/>} />
        <Route path='/signin' element={!user ?<Login/> : <Navigate to="/register"/>} />
      </Routes>
    </div>
  );
}

export default App;
