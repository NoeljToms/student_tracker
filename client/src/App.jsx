import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Student from './pages/Students.js';
import StudentInfo from './pages/StudentInfo.js';
import Navbar from './components/Navbar.js';
import NewStudent from './pages/NewStudent.js';
import EditStudent from './pages/EditStudent.js';
import Billing from './pages/Billing.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/students' element={<Student/>} />
        <Route path='/students/:id' element={<StudentInfo/>} />
        <Route path='/newstudent' element={<NewStudent />} />
        <Route path='/billing' element={<Billing/>} />
        <Route path='/editstudent/:id' element={<EditStudent/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/signin' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
