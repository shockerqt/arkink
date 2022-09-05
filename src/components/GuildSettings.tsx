import { useGuild } from './Guild';

const GuildSettings = () => {
  const { guild } = useGuild();

  return (
    <>
      <h1>{guild?.id}</h1>
    </>
  );
};

export default GuildSettings;
