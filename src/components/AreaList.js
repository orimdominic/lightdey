import PropTypes from 'prop-types';
import Area from './Area';

AreaList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default function AreaList(props) {
  const { list } = props;
  return (
    <>
      {list.length ? (
        props.list.map((a) => (
          <Area key={a.name.toLowerCase().replace(' ', '-')} area={a} />
        ))
      ) : (
        <div>No areas available</div>
      )}
    </>
  );
}
