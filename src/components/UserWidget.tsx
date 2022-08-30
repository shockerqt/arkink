import { User } from '../App';
import { DiscordIcon } from '../utils/icons';

import './UserWidget.scss';
import DefaultAvatar from '../static/img/default_avatar.png';
import { useEffect, useRef, useState } from 'react';

const baseUrl = 'https://cdn.discordapp.com/';
const loginUrl = 'https://discord.com/api/oauth2/authorize?client_id=1011913636907864154&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify';

const UserWidget = ({ user, setUser }: {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(undefined);
  };

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
    <div className="UserWidget" ref={widgetRef}>
      {user ?
        <div className="discordPhoto" onClick={onMenuClick}>
          <img src={user.avatar
            ? `${baseUrl}avatars/${user.id}/${user.avatar}.gif?size=48`
            : DefaultAvatar
          } alt="Discord Photo" />
        </div> :
        <a
          role="button"
          href={loginUrl}
          className="discordLoginButton">
          <DiscordIcon /> Login with Discord
        </a>}
      {user && isOpen &&
        <div
          className={`dropdownMenu discordMenu ${hidden ? 'hidden' : ''}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          onTransitionEnd={onMenuTransitionEnd}
        >
          <div className="topBanner">
            {user.banner && <img src={`${baseUrl}banners/${user.id}/${user.banner}.gif?size=300`} alt="Discord Photo" />}
          </div>
          <div className="menuPhoto">
            <img src={user.avatar
              ? `${baseUrl}avatars/${user.id}/${user.avatar}.gif?size=96`
              : DefaultAvatar
            } alt="Discord Photo" />
          </div>
          <div className="menuBody">
            <div className="menuUsername"><b>{user.username}</b>#{user.discriminator}</div>
            <button className="menuButton dangerButton" onClick={logout}>Logout</button>
          </div>
        </div>
      }
    </div>
  );
};

export default UserWidget;
