import type { FC } from 'react';
import { usernameReplace } from '@utils/tsxUtils';
import { hashtagReplace } from '@utils/tsxUtils';

const CommentViewText: FC<{ text: string }> = ({ text }) => {
  const output = usernameReplace(hashtagReplace(text));
  return <>{output}</>;
};

export default CommentViewText;
