import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Artists from '../features/artists/Artists.tsx';


const MainPage = () => {

  return (
    <>
      <Container>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Spotify
            </Typography>
          </Toolbar>
        </AppBar>
      </Container>
      <Artists/>
    </>
  );
};

export default MainPage;