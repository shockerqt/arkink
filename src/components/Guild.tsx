import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { fetchGuild, IGuild } from '../utils/api';

const Guild = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [guild, setGuild] = useState<IGuild>();

  useEffect(() => {
    if (guildId && !isNaN(parseInt(guildId))) fetchGuild(parseInt(guildId), (guild: IGuild) => setGuild(guild));
    else navigate('/');
  }, [guildId]);

  return (
    <>
      <h1 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">{guild?.guildname}</h1>
      <div className="flex">
        <aside className="w-48" aria-label="Sidebar">
          <div className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {[
              ['.', 'Overview'],
              ['raids', 'Raids'],
              ['tournaments', 'Tournaments'],
              ['members', 'Members'],
              ['settings', 'Settings'],
            ].map(([path, text], index, array) =>
              <NavLink
                key={path}
                end
                to={path}
                className={({ isActive }) =>
                  `block relative py-2 px-4 w-full border-gray-200 cursor-pointer ${index === 0
                    ? 'border-b rounded-t-lg' // first item
                    : index === array.length - 1
                      ? 'rounded-b-lg' // last item
                      : 'border-b'} ${isActive
                    ? ' focus:outline-none text-white dark:bg-gray-800 dark:border-gray-600'
                    : ' focus:ring-2 hover:bg-gray-100 hover:text-blue-700 focus:z-50 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'}`}>
                {text}
              </NavLink>)}
          </div>
        </aside>
        <Outlet context={{ guild }} />
      </div>
    </>
  );
};

export const useGuild = () => {
  return useOutletContext<{ guild: IGuild | undefined }>();
};

export default Guild;
