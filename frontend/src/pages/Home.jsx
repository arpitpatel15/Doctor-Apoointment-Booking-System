import React, { useContext } from 'react'
import Header from '../componants/Header'
import SpecialityMenu from '../componants/SpecialityMenu'
import TopDoctors from '../componants/TopDoctors'
import Banner from '../componants/Banner'

function Home() {

  
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
