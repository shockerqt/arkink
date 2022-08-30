import { Outlet } from 'react-router-dom';
import { User } from '../App';

import './Layout.scss';
import UserWidget from './UserWidget';

const Layout = ({ user, setUser }: { 
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
 }) => {

  return (
    <div className="layout">

      <UserWidget user={user} setUser={setUser} />

      <Outlet />

    </div>
  );
};

export default Layout;
