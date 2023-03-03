import FooterWidget from '@components/additionalWidgetComponents/footerWidget';
import PeopleToFollow from '@components/additionalWidgetComponents/peopleToFollow';
import TrendingWidget from '@components/additionalWidgetComponents/trendingWidget';
import type { FC } from 'react';

const AdditionalWidgets: FC = () => {
  return (
    <aside className='h-screen w-full'>
      <PeopleToFollow></PeopleToFollow>
      <div className='ml-2 border-t border-themePrimary-100/20'></div>
      <TrendingWidget></TrendingWidget>
      <div className='ml-2 border-t border-themePrimary-100/20'></div>
      <FooterWidget></FooterWidget>
    </aside>
  );
};

export default AdditionalWidgets;
