import { useGuild } from './Guild';

const GuildSummary = () => {
  const { guild } = useGuild();

  return (
    <>
      <h1>{guild?.id}</h1>
    </>
  );
};

export default GuildSummary;
