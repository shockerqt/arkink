import { Outlet } from 'react-router-dom';
import { useAlerts } from '../utils/alert';
import { User } from '../utils/api';
import Navbar from './Navbar';

import UserWidget from './UserWidget';

const Layout = ({ user, setUser }: {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
 }) => {
  const { alerts, addAlert } = useAlerts();

  return (
    <>
      <Navbar user={user} />

      <button onClick={() => addAlert('XD', 'danger')}>add</button>
      {Object.entries(alerts).map(([key, alert]) => <div key={key}>{alert.message} <button onClick={alert.dismiss}>dismiss</button></div>)}
      <UserWidget user={user} setUser={setUser} />

      <div className="px-24 py-4">
        <Outlet />
      </div>

    </>
  );
};

export default Layout;
