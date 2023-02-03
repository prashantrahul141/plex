import HeadComp from '@components/common/headcomponent';
import SideBarNavigation from '@components/common/sidebarnavigation';
import TopBarNavigation from '@components/common/topbarnavigation';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Home'></HeadComp>

      <TopBarNavigation
        activeTab='Bookmarks'
        authorName='Prashant'
        authorAvatar='https://cdn.discordapp.com/avatars/995581232459038760/d37933badeb94c9f07d3fabc103df2f0.png'></TopBarNavigation>
    </>
  );
};
export default HomePage;
