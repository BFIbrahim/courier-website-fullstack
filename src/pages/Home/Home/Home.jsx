import React from 'react'
import Banner from '../Banner/Banner'
import WorkProcess from '../WorkProcess/WorkProcess'
import Services from '../Services/Services'
import OurClients from '../OurClients/OurClients'
import Features from '../Features/Features'
import BeMarchant from '../BeMarchant/BeMarchant'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <WorkProcess></WorkProcess>
        <Services></Services>
        <OurClients></OurClients>
        <Features></Features>
        <BeMarchant></BeMarchant>
    </div>
  )
}

export default Home