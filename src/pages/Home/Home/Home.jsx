import React from 'react'
import Banner from '../Banner/Banner'
import WorkProcess from '../WorkProcess/WorkProcess'
import Services from '../Services/Services'
import OurClients from '../OurClients/OurClients'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <WorkProcess></WorkProcess>
        <Services></Services>
        <OurClients></OurClients>
    </div>
  )
}

export default Home