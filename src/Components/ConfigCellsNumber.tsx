import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, {useState, FC} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateChosenWord, updateWordLength, updateLines } from "../app/slice";
import { TStore } from '../app/store';
import { TWordLength } from '../Types/types'



const ConfigCellsNumber:FC = () => {
  const dispatch = useDispatch();
  const { gameState, wordLength } = useSelector((state: TStore) => state.appSliceReducer);

  const [alignment, setAlignment] = useState(`${wordLength}`);
  const handleClick = (event: React.MouseEvent<HTMLElement>, newAlignment: string,) => {
    event.preventDefault();
    const button = event.currentTarget;
    let l:number = button.id.length;
    let len = parseInt(button.id[l - 1]) as TWordLength; 
    
    dispatch(updateWordLength(len));
    dispatch(updateChosenWord());
    setAlignment(newAlignment);
  };

  return (
      <>
        <Typography sx={{width: '90%'}} color='gray' fontWeight={600} my={1}>Choose the length of the word:</Typography>
        <ToggleButtonGroup
          disabled={gameState === "Loss" || gameState === "Win" ? false: true}
          color="success"
          value={alignment}
          exclusive
          onChange={handleClick}
        >
        {[4, 5, 6, 7, 8, 9].map(el => <ToggleButton key={el} sx={{ width: "30px" }} value={`${el}`} id={`length-${el}`}>{el}</ToggleButton>)}
        </ToggleButtonGroup>
      </>
  )
}

export default ConfigCellsNumber