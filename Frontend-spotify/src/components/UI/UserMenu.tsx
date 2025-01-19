import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import React, { useState } from 'react';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return user && (
    <>
      <Button
        onClick={handleClick}
        color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Tracks list</MenuItem>
        <MenuItem>Albums</MenuItem>
        <MenuItem>Artists</MenuItem>
        <MenuItem>Tracks history</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;