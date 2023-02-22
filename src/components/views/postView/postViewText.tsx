import { hashtagReplace, usernameReplace } from '@utils/tsxUtils';
import type { FC } from 'react';

const PostViewText: FC<{ text: string }> = ({ text }) => {
  const output = usernameReplace(hashtagReplace(text));

  return <>{output}</>;
};

export default PostViewText;
