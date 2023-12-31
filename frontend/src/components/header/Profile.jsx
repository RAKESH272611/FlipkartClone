import React, { useState } from 'react'
import {Box,Typography,Menu,MenuItem,styled} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useDispatch } from 'react-redux';
import { removeItemsAfterLogOut } from '../../redux/actions/cartAction';

const Component = styled(Menu)`
   margin-top: 5px;
`;

const Logout = styled(Typography)`
   font-size: 14px;
   margin-left: 20px;
`;

const Profile = ({account,setAccount}) => {

   const dispatch = useDispatch();

  const [open,setOpen] = useState(false);

  const handleClick = (e) => {
     setOpen(e.currentTarget);
  }

  const handleClose = () => {
     setOpen(false);
  }

  const LogoutUser = () => {
     setAccount('');
     window.localStorage.removeItem('authToken')
     dispatch(removeItemsAfterLogOut());
  }

  return (
    <>
     <Box onClick={handleClick}><Typography style={{marginTop:2,cursor:"pointer"}}>{account}</Typography></Box>
     <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClose();LogoutUser();}}>
          <PowerSettingsNewIcon color="primary" fontSize='small'/>
          <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    </>
  )
}

export default Profile
