import Image from 'next/image';
import type { FC } from 'react';

const WelcomePageCards: FC = () => {
  const cardsData: Array<{
    imageUrl: string;
    imageAttribution: string;
    header: string;
    headerGradientText: string;
    description: string;
    textGradientColors: { colorOne: string; colorTwo: string };
    backgroundOverlayColor: string;
  }> = [
    {
      imageUrl: '/static/welcomepage_friends.jpg',
      imageAttribution: 'https://unsplash.com/@lobosnico',
      header: 'Get together with',
      headerGradientText: 'Friends',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab at velit
      cupiditate! Quasi explicabo, odio voluptate quibusdam iure quas quia
      error. Voluptatem voluptate eum fugiat, exercitationem porro modi
      dolorem! Quos?`,
      textGradientColors: {
        colorOne: 'from-welcomePageGradientColor-1',
        colorTwo: 'to-welcomePageGradientColor-2',
      },
      backgroundOverlayColor: '#ffffff',
    },
    {
      imageUrl: '/static/welcomepage_family.jpg',
      imageAttribution: 'https://unsplash.com/@pablomerchanm',
      header: 'Get together with',
      headerGradientText: 'Family',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab at velit
      cupiditate! Quasi explicabo, odio voluptate quibusdam iure quas quia
      error. Voluptatem voluptate eum fugiat, exercitationem porro modi
      dolorem! Quos?`,
      textGradientColors: {
        colorOne: 'from-welcomePageGradientColor-3',
        colorTwo: 'to-welcomePageGradientColor-4',
      },
      backgroundOverlayColor: '#ffffff',
    },
  ];

  const plex = {
    header: 'Get together with',
    headerGradientText: 'Plex',
    gradientColors: {
      colorOne: 'from-welcomePageGradientColor-5',
      colorTwo: 'to-welcomePageGradientColor-6',
    },
  };
  return (
    <div>
      {cardsData.map((eachCardData, index) => {
        return (
          <div key={index} className='w-full'>
            <article className='relative w-full'>
              <Image
                className={`w-full select-none blur-[2px]`}
                alt='image'
                src={eachCardData.imageUrl}
                width={1000}
                height={1000}></Image>

              <header className='absolute top-1/3 left-1/2 -translate-x-1/2 text-center'>
                <h1 className='mx-auto font-unbounded text-4xl tracking-wide text-themePrimary-50'>
                  {eachCardData.header}&nbsp;
                  <span
                    className={`bg-gradient-to-r ${eachCardData.textGradientColors.colorOne} ${eachCardData.textGradientColors.colorTwo} bg-clip-text text-transparent`}>
                    {eachCardData.headerGradientText}
                  </span>
                </h1>
                <p className='mt-2 font-mukta leading-tight tracking-wide text-themePrimary-50/90'>
                  {eachCardData.description}
                </p>
              </header>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default WelcomePageCards;
