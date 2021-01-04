import { Link } from 'react-router-dom';
import LightBulbMd from '../components/LightBulbMd';

export default function Header(props) {
  return (
    <header className="text-gray-400 bg-black">
      <div className="flex flex-row items-center justify-center p-5 mx-auto flex-nowrap ">
        <Link to="/" className="flex items-center font-medium text-white">
          <LightBulbMd
            classes="h-8 w-8 fill-current text-yellow-400"
            strokeWidth="1"
          />
          <span className="ml-2 text-xl">Light dey?</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center ml-auto text-base">
          <Link to="/about" className="text-white hover:underline">
            about
          </Link>
        </nav>
      </div>
    </header>
  );
}
