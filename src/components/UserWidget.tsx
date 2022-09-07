import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { DiscordIcon } from '../utils/icons';
import DefaultAvatar from '../static/img/default_avatar.png';
import { User } from '../utils/api';

const baseUrl = 'https://cdn.discordapp.com/';

const UserWidget = ({ user, setUser }: {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  const onMenuClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else setHidden(true);
  };

  useEffect(() => {
    if (isOpen) {
      setHidden(false);
    }
  }, [isOpen]);

  const onMenuTransitionEnd = () => {
    if (hidden) setIsOpen(false);
    else {
      document.onclick = (event: MouseEvent) => {
        if (event.target instanceof Node && !widgetRef.current?.contains(event.target)) {
          setHidden(true);
          document.onclick = null;
        }
      };
    }
  };

  return (
    <div className="relative right-10 top-8 float-right" ref={widgetRef}>
      {user ?
        <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer" onClick={onMenuClick}>
          <img src={user.avatar
            ? `${baseUrl}avatars/${user.id}/${user.avatar}.gif?size=48`
            : DefaultAvatar
          } alt="Discord Photo" />
        </div> :
        <a
          role="button"
          href={`${import.meta.env.VITE_SERVER_URL}/auth/discord`}
          className="btn btn-primary text-white flex items-center gap-2 bg-blue-800 hover:bg-blue-900 focus:ring-blue-600 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-600">
          <DiscordIcon className="h-4" /> Login with Discord
        </a>}
      {user && isOpen &&
        <div
          className={`absolute w-72 rounded-lg shadow-lg bg-gray-900 overflow-hidden top-16 right-0 transition ease-in origin-top-right ${hidden ? 'opacity-0 scale-95 ease-out' : ''}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onTransitionEnd={onMenuTransitionEnd}
        >
          <div className="bg-sky-800 w-full h-24 overflow-hidden">
            {user.banner && <img className="w-100 object-cover" src={`${baseUrl}banners/${user.id}/${user.banner}.gif?size=300`} alt="Discord Photo" />}
          </div>
          <div className="absolute w-24 h-24 rounded-full overflow-hidden left-3 top-10 outline outline-[6px] outline-gray-900">
            <img className="w-full object-cover" src={user.avatar
              ? `${baseUrl}avatars/${user.id}/${user.avatar}.gif?size=96`
              : DefaultAvatar
            } alt="Discord Photo" />
          </div>
          <div className="mt-12 px-3 pb-1 text-sm">
            <div className="my-2 text-gray-400"><b className="text-white text-lg">{user.username}</b>#{user.discriminator}</div>
            <hr className="border-slate-700 my-2" />
            {/* <Link to="profile" onClick={() => setHidden(true)} className="px-2 py-2 my-1 block text-white btn btn-transparent">Profile</Link> */}
            <Link to="roster" onClick={() => setHidden(true)} className="px-2 py-2 my-1 block btn btn-transparent text-start">Roster</Link>
            <Link to="/" onClick={() => setHidden(true)} className="px-2 py-2 my-1 block btn btn-transparent text-start">Settings</Link>
            <hr className="border-slate-700 mt-2" />
            {/* <button className="my-3 btn btn-danger w-full" onClick={logout}>Logout</button> */}
            <a
              role="button"
              href={`${import.meta.env.VITE_SERVER_URL}/auth/logout`}
              className="my-3 btn btn-danger w-full block">
              Logout
            </a>
          </div>
        </div>
      }
    </div>
  );
};

export default UserWidget;
