import StateList from '../components/StateList';
import Header from '../components/Header';

const States = (props) => {
  return (
    <div>
      <Header />
      <div className="py-6 text-center">
      <h2 className="text-3xl font-medium">States</h2>
      </div>
      <div className="px-5 mx-auto sm:px-12">
        <StateList />
      </div>
    </div>
  );
};

export default States;
