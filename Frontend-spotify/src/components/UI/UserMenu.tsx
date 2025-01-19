import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/UsersSlice.ts';
import { logout } from '../../features/users/usersThunk.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;