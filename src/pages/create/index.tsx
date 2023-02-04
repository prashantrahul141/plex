import CreatePostForm from '@components/forms/createpostform';
import type { NextPage } from 'next';

const CreatePage: NextPage = () => {
  return (
    <div className='w-96'>
      <CreatePostForm></CreatePostForm>
    </div>
  );
};

export default CreatePage;
