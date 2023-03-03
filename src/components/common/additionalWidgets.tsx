import PeopleToFollow from '@components/additionalWidgetComponents/peopleToFollow';
import type { FC } from 'react';

const AdditionalWidgets: FC = () => {
  return (
    <aside className='h-screen w-full'>
      <PeopleToFollow></PeopleToFollow>
    </aside>
  );
};

export default AdditionalWidgets;
