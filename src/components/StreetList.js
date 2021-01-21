import PropTypes from 'prop-types';
import Street from './Street';

StreetList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default function StreetList(props) {
  const { list } = props;

  return (
    <>
      {list.length &&
        list.map((st) => (
          <Street key={st.name.toLowerCase().replace(' ', '-')} street={st} />
        ))}
    </>
  );
}

/*           <Link
              to="/updates"
              key={s.name.toLowerCase().replace('/', ' ').replace(' ', '-')}
              className="flex flex-row mb-2 border-gray-400"
            >
              <button
                onClick={(e) => persistSelStreet(s.name)}
                className="w-full"
              >
                <div className="flex items-center flex-1 p-4 bg-white border rounded-md shadow cursor-pointer select-none dark:bg-gray-800">
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">{s.name}</div>
                  </div>
                </div>
              </button>
            </Link> */
