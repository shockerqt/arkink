import { useGuild } from './Guild';

const GuildTournaments = () => {
  const { guild } = useGuild();

  return (
    <>
      <h1>{guild?.id}</h1>
    </>
  );
};

export default GuildTournaments;
