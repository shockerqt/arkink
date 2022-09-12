import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchMyGuilds, IGuild, User } from '../utils/api';
import { LayoutContext } from './Layout';
import Modal from './Modal';

const Navbar = ({ user, className }: {
  user: User | undefined,
  className?: string,
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
    <nav className={`bg-gray-900 ${className}`}>
      <div className="flex flex-col items-center h-full w-full py-4 space-y-3">
        {guilds?.map((guild: IGuild) =>
          <NavLink key={guild.id} to={`/guild/${guild.id}`} title={guild.name} className={({ isActive }) => `btn overflow-hidden btn-outline border-none rounded-full w-12 h-12 p-0 text-xl grid place-items-center${isActive ? ' ring-4 ring-gray-600' : ''}`}>
            {guild.icon
              ? <img src={`${import.meta.env.VITE_DISCORD_IMAGE_BASE_URL}/icons/${guild.id}/${guild.icon}.png?size=48`} alt="Discord Photo" />
              : guild.name[0]}
          </NavLink>)}
        <button className="btn btn-outline border-none rounded-full w-12 h-12 p-0 text-xl" onClick={() => setShowModal(true)}>+</button>
      </div>
      {user && showModal && <AddGuildModal close={() => setShowModal(false)} />}
    </nav>
  );
};

const AddGuildModal = ({ close }: {
  close: () => void,
}) => {

  return (
    <Modal close={close}>
      <>
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Want to register your guild?</h3>
        <a className="flex items-center flex-col gap-5" href={import.meta.env.VITE_BOT_INVITE_LINK}>
          <img className="w-32 rounded-full" src="https://cdn.discordapp.com/app-icons/1011913636907864154/1bb12c08183d43fc4c1ae4c1b0b4fcb2.webp?size=128" alt="Aratt image" />
          <p className="btn btn-primary w-60">Invite Aratt to your server</p>
        </a>
        <button type="button" onClick={close} className="btn btn-outline">Close</button>
      </>
    </Modal>
  );
};

export default Navbar;
