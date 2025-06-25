import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [aToken,setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([]);
    const [appointments,setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false);
    const getAllDoctors = async() =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers: {aToken}})
            if(data.success){
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const changeAvailability = async(docId) =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers: {aToken}})
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllApoointments = async() =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers: {aToken}})
            if(data.success){
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancleAppointment = async(appointmentId) =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancle-appointment',{appointmentId},{headers: {aToken}})
            if(data.success){
                toast.success(data.message);
                getAllApoointments();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async() =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers: {aToken}})
            if(data.success){
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
       aToken,setAtoken,backendUrl,getAllDoctors,doctors,changeAvailability,getAllApoointments,setAppointments,appointments,cancleAppointment,getDashData,dashData
    };

    

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;