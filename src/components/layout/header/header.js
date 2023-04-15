import logo from 'resources/LabelMe_Logo.svg';
import SubHeader from '../subheader/subheader.js';
import './header.css';

function Header() {
  return (
    <>
    {/*
      <div className="textHeader">
          <h1>LabelMe Audio</h1>
      </div>

      */}
      <h1 className='mainHeader'>
        <img src={logo}/>
      </h1>
      {/*

      <SubHeader />
      */}
    </>
  )
}



export default Header;
