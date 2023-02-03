import HeadComp from '@components/common/headcomponent';
import SideBarNavigation from '@components/common/sidebarnavigation';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <HeadComp headTitle='Home'></HeadComp>

      <SideBarNavigation
        activateTab='Bookmarks'
        authorName='Prashant'
        authorAvatar='https://cdn.discordapp.com/avatars/995581232459038760/d37933badeb94c9f07d3fabc103df2f0.png'></SideBarNavigation>
    </>
  );
};
export default HomePage;
