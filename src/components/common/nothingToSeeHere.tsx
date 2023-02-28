import type { FC } from 'react';

const NothingToSeeHere: FC<{ text: string }> = ({
  text = 'Nothing to see here.',
}) => {
  return <>{text}</>;
};

export default NothingToSeeHere;
