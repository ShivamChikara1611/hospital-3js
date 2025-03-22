import React from 'react'
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import SkinCancer from '../components/SkinCancer';

const Home = () => {
    return (
    <div>
        <Header />
        <SkinCancer />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
    </div>
    )
}

export default Home;