import { useEffect } from 'react';
import { useGuild } from './Guild';

const GuildMembers = () => {
  const { guild } = useGuild();

  useEffect(() => {
    if (guild?.id) {
      // fetchGuildMembers(guild.id);
    }
  }, [guild]);

  return (
    <>
      <h1>{guild?.id}</h1>
    </>
  );
};

export default GuildMembers;
