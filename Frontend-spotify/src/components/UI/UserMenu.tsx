import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/UsersSlice.ts';
import { logout } from '../../features/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  const handleTracksHistory = () => {
    navigate('/tracks-history');
    handleClose();
  };

  const handleAlbums = () => {
    navigate('/albums/new');
    handleClose();
  };

  const handleTracks = () => {
    navigate('/tracks/new');
    handleClose();
  };

  const handleUnpublished = () => {
    navigate('/unpublished');
    handleClose();
  };


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
        {user && user.role === 'admin' && (
          <MenuItem onClick={handleUnpublished}>Unpublished</MenuItem>
        )}
        <MenuItem onClick={handleAlbums}>Add new Album</MenuItem>
        <MenuItem onClick={handleTracks}>Add new Track</MenuItem>
        <MenuItem onClick={handleTracksHistory}>Tracks history</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;