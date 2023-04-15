import HomeButton from './Icons/homeIcons';
import './homepage.js';
import './homepage.css'
import HomeCard from './Cards/HomeCard';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import React, {useCallback, useState} from 'react';

function HomePage() {
  const history = useHistory();
  const toTrf0Disk2 = useCallback(() => history.push('/bucket-trf0-disk2'), [history]);
  const toTrf0Disk3 = useCallback(() => history.push('/bucket-trf0-disk3'), [history]);
  const toAudiotDisk3 = useCallback(() => history.push('/bucket-audiot-disk3'), [history]);

  const [bucket, setBucket] = useState("/");

  // const cardsToMake
  const defaultImage = 'https://media.nga.gov/iiif/544ba14c-5f61-4acf-af9c-5dd374c49fd2__640/full/!588,600/0/default.jpg';
  const defaultImage2 = 'https://media.nga.gov/iiif/cfdcbd6c-edfe-4c71-b285-a53ac055cdff__640/full/!588,600/0/default.jpg';
  const defaultImage3 = 'https://media.nga.gov/iiif/3fd9a4fb-25d6-4d36-a7d8-ca9841e224be/full/!588,600/0/default.jpg';
  return (
    <>
    <div className='Home'>
      <div className = 'prompt'>
        <p> Pick a bucket:</p>
      </div>


      <div className='HomeCards'>

        <HomeCard 
          onClick={toTrf0Disk2} 
          cardTitle='trf0-disk2' 
          img={defaultImage}
        />
        <HomeCard 
          onClick={toTrf0Disk3} 
          cardTitle='trf0-disk3' 
          img={defaultImage2}
        />
        <HomeCard 
          onClick={toAudiotDisk3} 
          cardTitle='audiot-disk03' 
          img={defaultImage3}
        />
      </div>
      
    </div>

    </>
  )
}



export default HomePage;
