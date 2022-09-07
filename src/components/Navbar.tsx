import { BaseSyntheticEvent, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchMyGuilds, fetchMyUnregisteredGuilds, IGuild, registerGuild, User } from '../utils/api';
import { LayoutContext } from './Layout';
import Modal from './Modal';

interface RegisterGuildForm {
  guildId: string;
}

const Navbar = ({ user }: {
  user: User | undefined,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [guilds, setGuilds] = useState<IGuild[]>();
  const layoutContext = useContext(LayoutContext);

  const fetchGuildList = () => {
    fetchMyGuilds(async (response: Response) => {
      console.log('fetchMyGuilds');
      if (response.ok) {
        const guilds = await response.json();
        setGuilds(guilds);
      } else {
        const error = await response.json();
        console.log(error);
        layoutContext.addAlert(`${error.message}${error.retry_after ? ` Retry after ${error.retry_after} seconds` : ''}`, 'danger');
      }
    });
  };

  useEffect(() => {
    if (user) fetchGuildList();
  }, [user]);

  return (
    <nav className="absolute bg-gray-900 left-0 w-16 h-full">
      <div className="flex flex-col items-center h-full w-full py-4 space-y-3">
        {guilds?.map((guild: IGuild) => <NavLink key={guild.id} to={`/guild/${guild.id}`} className={({ isActive }) => `btn btn-outline border-none rounded-full w-12 h-12 p-0 text-xl grid place-items-center${isActive ? ' ring-4 ring-gray-600' : ''}`}>
          {guild.name[0]}
        </NavLink>)}
        <button className="btn btn-outline border-none rounded-full w-12 h-12 p-0 text-xl" onClick={() => setShowModal(true)}>+</button>
      </div>
      {user && showModal && <AddGuildModal close={() => setShowModal(false)} fetchGuildList={fetchGuildList} />}
    </nav>
  );
};

const AddGuildModal = ({ close, fetchGuildList }: {
  close: () => void,
  fetchGuildList: () => void,
}) => {
  const [unregisteredGuilds, setUnregisteredGuilds] = useState<IGuild[]>();
  const [formData, setFormData] = useState<RegisterGuildForm>({ guildId: '' });
  const layoutContext = useContext(LayoutContext);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(formData);
    if (formData.guildId) registerGuild(formData.guildId, () => {
      close();
      fetchGuildList();
    });
  };

  useEffect(() => {
    fetchMyUnregisteredGuilds(async (response) => {
      console.log('ACA');
      if (response.ok) {
        const unregisteredGuilds = await response.json();
        console.log('UNREGISTRED GULDS', unregisteredGuilds);
        setUnregisteredGuilds(unregisteredGuilds);
      } else {
        const error = await response.json();
        console.log(error);
        layoutContext.addAlert(`${error.message}${error.retry_after ? ` Retry after ${error.retry_after} seconds` : ''}`, 'danger');
      }
    });
  }, []);

  return (
    <Modal close={close}>
      <>
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Register your guild</h3>
        <div>
          {formData.guildId && (() => {
            const selectedGuild = unregisteredGuilds?.find(guild => guild.id === formData.guildId);
            if (!selectedGuild) return (
              <div>Please select a guild</div>
            );
            else return (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {selectedGuild.icon ?
                  <img src={`${import.meta.env.VITE_DISCORD_IMAGE_BASE_URL}/icons/${selectedGuild.id}/${selectedGuild.icon}.png?size=48`} alt="Discord Photo" /> :
                  <div className="btn btn-outline border-none rounded-full w-12 h-12 p-0 text-xl grid place-items-center">
                    {selectedGuild.name[0]}
                  </div>
                }
              </div>
            );
          })()
          }
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="guild" className="label">Guild to register</label>
            <select id="guild" className="input" value={formData?.guildId} onChange={(event: BaseSyntheticEvent) => setFormData({ guildId: event.target.value })}>
              <option value="" disabled></option>
              {unregisteredGuilds?.map((guild) => <option key={guild.id} value={guild.id}>{guild.name}</option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button type="submit" className="btn btn-primary">Register</button>
            <button type="button" onClick={close} className="btn btn-outline">Cancel</button>
          </div>
        </form>
      </>
    </Modal>
  );
};

export default Navbar;
