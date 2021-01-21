import { State } from './';
import PropTypes from 'prop-types';

StateList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default function StateList(props) {
  return (
    <>
      {props.list.length
        ? props.list.map((st) => (
            <State key={st.name.toLowerCase().replace(' ', '-')} state={st} />
          ))
        : null}
    </>
  );
}

// TODO: Insert a user friendly UI for empty state lists
