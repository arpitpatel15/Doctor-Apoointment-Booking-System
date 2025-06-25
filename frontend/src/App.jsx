import React,{useContext} from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import Contact from "./pages/Contect"
import About from "./pages/About"
import MyAppointment from './pages/MyApponintment'
import MyProfile from "./pages/MyProfile"
import Appointment from "./pages/Appointment"
import NavBar from "./componants/NavBar"
import Footer from "./componants/Footer"
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from "./context/AppContext"
function App() {

  const {userData} = useContext(AppContext)
  const profile = userData.image
  const name = userData.name
  return (
    <div class='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <NavBar profile={profile} name={name}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/my-appointment" element={<MyAppointment/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
