import { getUpdates } from '../utils/api';
import { useUserSelection } from '../custom-hooks/user-selection';
import { getPath } from '../utils/get-path';
import { useEffect, useState } from 'react';

const Details = (props) => {
  const [updates, setUpdates] = useState([])
  const { selection } = useUserSelection();
  const dbPath = getPath(selection);
  const sortTimeDesc = (u1, u2) => {
    if(u1.updatedOn>u2.updatedOn){
      return -1
    } else if(u1.updatedOn<u2.updatedOn){
      return 1
    }
    return 0;
  }

  useEffect(() => {
    getUpdates(dbPath).then(setUpdates)
  }, [dbPath])
  return (<ul>
    {updates && updates.sort(sortTimeDesc).map(update => {
      return (
        <li>{update.status}</li>
      )
    })}
  </ul>);
};

export default Details;
