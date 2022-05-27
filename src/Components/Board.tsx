import {FC} from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../app/store';

const Board:FC = () => {
  const { wordLength, lines } = useSelector((state: TStore) => state.appSliceReducer);

  return (
    <>
      <table >
        <tbody>
          {lines.map((_, index) => 
            
              <tr key={index} id={`l${index}`}>
                {_.map((__, _index) => 
                  <th className='b' key={_index}>{__}</th>
                )}
              </tr>
            
            )}
        </tbody>
      </table>
    </>
    
  )
}

export default Board