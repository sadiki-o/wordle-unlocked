import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { AppBar, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import ConfigCellsNumber from './Components/ConfigCellsNumber';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from './app/store';
import { updateLines } from './app/slice';
import { alphabet } from './Types/types';


type Anchor = 'left';
const App = () => {
  const dispatch = useDispatch();
  const { gameState, playWrong, currentLine } = useSelector((state: TStore) => state.appSliceReducer);

  const [state, setState] = React.useState({
    left: false
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    let key:string = event.key.toString().toUpperCase()
    if (key === 'BACKSPACE' ){
      dispatch(updateLines('del'));
    }else if(key === 'ENTER'){
      dispatch(updateLines('tryValidate'));
    }else if (alphabet.includes(key)) {
      dispatch(updateLines(key));
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (playWrong === true) {
      new Audio(`${process.env.PUBLIC_URL}/audio/wrong.mp3`)
    }
    if(gameState === "Win" ){
      new Audio(`${process.env.PUBLIC_URL}/audio/gta.mp3`).play();
    }
    if(currentLine === 5 && gameState === "Loss"){
      new Audio(`${process.env.PUBLIC_URL}/audio/fail.mp3`).play();
    }
  }, [gameState, playWrong])

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };


  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} className='toolbar'>
                <div className='hover'><MenuIcon onClick={toggleDrawer(anchor, true)} /></div>
                <img src={`${process.env.PUBLIC_URL}/logotext.png`} width='160px' className='logo'/>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            PaperProps={{
              sx: {
                width: "50%",
                minWidth: "200px",
                display: "flex",
                alignItems: "center"
              }
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <ConfigCellsNumber />
          </Drawer>


          <Board />

          <Keyboard />

        </React.Fragment>
      ))}
    </div>
  );
}


export default App;
