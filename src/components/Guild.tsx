import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { fetchGuild, IGuild } from '../utils/api';
import { LayoutContext } from './Layout';

const Guild = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [guild, setGuild] = useState<IGuild>();
  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    if (guildId) fetchGuild(guildId, async (response) => {
      if (response.ok) {
        const requestedGuild = await response.json();
        console.log(requestedGuild);
        setGuild(requestedGuild);
      } else {
        const error = await response.json();
        console.log(error);
        layoutContext.addAlert(`${error.message}${error.retry_after ? ` Retry after ${error.retry_after} seconds` : ''}`, 'danger');
      }
    });
    else navigate('/');
  }, [guildId]);

  if (guild) return (
    <>
      <menu className="flex flex-col h-full w-64 bg-gray-900/50">
        <div className="p-5">
          <h1 className="font-medium">{guild.name.length > 15 ? `${guild.name.substring(0, 15)}...` : guild.name}</h1>
        </div>
        <div className="p-5 overflow-y-auto grow">
        </div>
      </menu>
      <main>
        <h1 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">{guild?.name}</h1>
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
      </main>
    </>
  );
  else return <></>;
};

export const useGuild = () => {
  return useOutletContext<{ guild: IGuild | undefined }>();
};

export default Guild;
