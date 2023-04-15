import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Drawer, Divider, IconButton } 
    from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } 
    from '@mui/material';
import PermContactCalendarIcon from 
    '@mui/icons-material/PermContactCalendar';
import ReorderIcon from '@mui/icons-material/Reorder';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';

import './Menu.css'
const styles = {
    link: {
      color: 'black',
      textDecoration: 'none',
    }
  };

export default class Menu
    extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpened: false,
    };
  }
  toggleDrawerStatus = () => {
    this.setState({
      isDrawerOpened: true,
    })
  }
  closeDrawer = () => {
    this.setState({
      isDrawerOpened: false,
    })
  }
  render() {
    const { isDrawerOpened } = this.state;
    return (
    
      <div>
        <div className="MenuBtn">
            <Fab color="primary" aria-label="add" onClick={this.toggleDrawerStatus}>
                <ReorderIcon />
            </Fab>
            {/* <IconButton onClick={this.toggleDrawerStatus}>
              {!isDrawerOpened ? <ReorderIcon /> : <ReorderIcon /> }
            </IconButton> */}
          </div>
          <Divider/>
        <Drawer
          variant="temporary"
          open={isDrawerOpened}
          onClose={this.closeDrawer}
          anchor = "left"
        >
          <Link to='/'>
            <List>
              <ListItem button key='Home'>
                <ListItemIcon><HomeIcon/>
                </ListItemIcon>
                <ListItemText primary='Home' style={styles.link} />
              </ListItem>
            </List>
          </Link>
          <Link to='/'>
          <List>
            <ListItem button key='BrowseLabels'>
              <ListItemIcon><PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary='Browse Files' style={styles.link} />
            </ListItem>
            </List>
          </Link>
          <List><AmplifySignOut/></List>
        </Drawer>
      </div>
    );
  }
}

