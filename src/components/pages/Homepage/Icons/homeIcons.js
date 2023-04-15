// import './homeIcons.css'
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';


//Todo: implement icon option
const HomeButton = ({text, icon, onClick}) => {

    return (
      <div>
        <div className="HomeIconsContainer">
          <IconButton className=' HomeIconButtons'
              onClick={onClick}
              icon={<FolderFillIcon className="icon"/>}
          >
          <span className='tileName'>{text}</span>
          </IconButton>

        </div>
      </div>
    )
}


export default HomeButton
