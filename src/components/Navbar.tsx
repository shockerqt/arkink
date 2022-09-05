import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { createGuild, fetchGuilds, IGuild, User } from '../utils/api';
import Modal from './Modal';

interface CreateGuildForm {
  guildname: string;
}

const Navbar = ({ user }: {
  user: User | undefined,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<CreateGuildForm>();
  const [guilds, setGuilds] = useState<IGuild[]>();

  useEffect(() => {
    if (user) fetchGuilds((guilds: IGuild[]) => setGuilds(guilds));
  }, [user]);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData) createGuild(formData.guildname, () => {
      setShowModal(false);
      fetchGuilds((guilds: IGuild[]) => setGuilds(guilds));
    });
  };

  return (
    <nav className="absolute bg-gray-900 left-0 w-16 h-full">
      <div className="flex flex-col items-center h-full w-full py-4 space-y-3">
        {guilds?.map((guild: IGuild) => <NavLink key={guild.id} to={`/guild/${guild.id}`} className={({ isActive }) => `btn btn-outline border-none rounded-full w-12 h-12 p-0 text-xl grid place-items-center${isActive ? ' ring-4 ring-gray-600' : ''}`}>
          {guild.guildname[0]}
        </NavLink>)}
        <button className="btn btn-outline border-none rounded-full w-12 h-12 p-0 text-xl" onClick={() => setShowModal(true)}>+</button>
      </div>
      {showModal &&
        <Modal close={() => setShowModal(false)}>
          <>
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create guild</h3>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label htmlFor="guildname" className="label">Guild name</label>
                <input onChange={(event: BaseSyntheticEvent) => setFormData({ guildname: event.target.value })} type="text" name="guildname" id="guildname" className="input" placeholder="Shinsekai" />
              </div>
              <div className="flex items-center space-x-2">
                <button type="submit" className="btn btn-primary">Create</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </>
        </Modal>}
    </nav>
  );
};

export default Navbar;
