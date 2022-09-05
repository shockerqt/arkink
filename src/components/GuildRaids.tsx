import { useGuild } from './Guild';

const GuildRaids = () => {
  const { guild } = useGuild();

  return (
    <>
      <h1>{guild?.id}</h1>
    </>
  );
};

export default GuildRaids;
