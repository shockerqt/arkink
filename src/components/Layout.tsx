import { Outlet } from 'react-router-dom';
import { User } from '../App';
import { useAlerts } from '../utils/alert';

import './Layout.scss';
import UserWidget from './UserWidget';

const Layout = ({ user, setUser }: { 
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
 }) => {
  const { alerts, addAlert } = useAlerts();

  return (
    <div className="layout">
      <button onClick={() => addAlert('XD', 'danger')}>add</button>
      {Object.entries(alerts).map(([key, alert]) => <div key={key}>{alert.message} <button onClick={alert.dismiss}>dismiss</button></div>)}
      <UserWidget user={user} setUser={setUser} />

      <Outlet />

    </div>
  );
};

export default Layout;
