import { SyntheticEvent } from 'react';
import { useGuild } from './Guild';

const GuildRaids = () => {
  const { guild } = useGuild();

  const addRaid = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (guild) {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/guild/${guild.id}/add-raid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          category: 'argos',
          date: new Date(),
        }),
      });

      if (response.ok) {
        console.log(response);
      }
    }
  };

  return (
    <>
      <form onSubmit={addRaid}>
        <button type="submit">OK</button>
      </form>
    </>
  );
};

export default GuildRaids;
