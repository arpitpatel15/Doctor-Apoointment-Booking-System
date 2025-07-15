import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [appointments,setAppointments] = useState([])
    const [dToken,setdToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const getAppointment = async() =>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/appointments`,{
                headers:{dToken}})
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());    
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    
    const completeAppointment = async(appointmentId) =>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/complete-appointment`,{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointment()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const cancleAppointment = async(appointmentId) =>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/cancle-appointment`,{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointment()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const value = {
        dToken,setdToken,backendUrl,getAppointment,appointments,setAppointments,cancleAppointment,completeAppointment
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
}

export default DoctorContextProvider;