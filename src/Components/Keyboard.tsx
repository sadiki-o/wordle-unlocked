import BackspaceIcon from '@mui/icons-material/Backspace';
import { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateLines } from '../app/slice';
import { alphabet } from '../Types/types';

interface ButtonProps{
  id: string;
}

//custom button component that takes an event handler
const CustomButton: FC<ButtonProps> = ({ id }) => {
  const dispatch = useDispatch();

  const handleKeyPress = (event: MouseEvent) => {
    event.preventDefault();
    let t = event.target as HTMLButtonElement;
    let key = t.id.toUpperCase();
    if (alphabet.includes(key)) {
      dispatch(updateLines(key))
    }
  }

  return (
      <button className='key' onClick={handleKeyPress} id={id}>{id}</button>
    )
}

const Keyboard: FC = () => {
  const dispatch = useDispatch();

  return (
    <div id="keyboard">
      <div className="row-1">
        <CustomButton id="Q"/>
        <CustomButton id="W"/>
        <CustomButton id="E"/>
        <CustomButton id="R"/>
        <CustomButton id="T"/>
        <CustomButton id="Y"/>
        <CustomButton id="U"/>
        <CustomButton id="I"/>
        <CustomButton id="O"/>
        <CustomButton id="P"/>
      </div>
      <div className="row-2">
        <CustomButton id="A"/>
        <CustomButton id="S"/>
        <CustomButton id="D"/>
        <CustomButton id="F"/>
        <CustomButton id="G"/>
        <CustomButton id="H"/>
        <CustomButton id="J"/>
        <CustomButton id="K"/>
        <CustomButton id="L"/>
      </div>
      <div className="row-3">
        <button onClick={() => dispatch(updateLines("tryValidate"))} className="key keyEnter" id="Enter">ENTER</button>
        <CustomButton id="Z"/>
        <CustomButton id="X"/>
        <CustomButton id="C"/>
        <CustomButton id="V"/>
        <CustomButton id="B"/>
        <CustomButton id="N"/>
        <CustomButton id="M"/>
        <button onClick={() => dispatch(updateLines("del"))} className="key keyDelete" id="del"><BackspaceIcon/></button>
      </div>
    </div>
  )
}

export default Keyboard
