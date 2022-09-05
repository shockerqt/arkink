import { useGuild } from './Guild';

const GuildMembers = () => {
  const { guild } = useGuild();

  return (
    <>
      <h1>{guild?.id}</h1>
    </>
  );
};

export default GuildMembers;
