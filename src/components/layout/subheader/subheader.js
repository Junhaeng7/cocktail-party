import MenuIcon from '@rsuite/icons/Menu';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import React, {useCallback} from 'react';
import  { AmplifySignOut } from '@aws-amplify/ui-react'

import './subheader.css';

function SubHeader() {
  const history = useHistory();
  const toHomeOnClick = useCallback(() => history.push('/'), [history]);


  return (
    <h2 className='subheader'>
      <ButtonToolbar>
        <Button onClick={toHomeOnClick}>Home</Button>
        <IconButton icon={<MenuIcon />} size="lg" />
        <AmplifySignOut />
      </ButtonToolbar>

    </h2>
  )
}



export default SubHeader;
