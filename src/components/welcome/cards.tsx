import Image from 'next/image';
import type { FC } from 'react';

const WelcomePageCards: FC = () => {
  const cardsData: Array<{
    imageUrl?: string;
    imageAttribution?: string;
    header: string;
    headerGradientText: string;
    description?: string;
    gradientColors: { colorOne: string; colorTwo: string };
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
      gradientColors: {
        colorOne: 'from-welcomePageGradientColor-1',
        colorTwo: 'to-welcomePageGradientColor-2',
      },
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
      gradientColors: {
        colorOne: 'from-welcomePageGradientColor-3',
        colorTwo: 'to-welcomePageGradientColor-4',
      },
    },
    {
      header: 'Get together with',
      headerGradientText: 'Plex',
      gradientColors: {
        colorOne: 'from-welcomePageGradientColor-5',
        colorTwo: 'to-welcomePageGradientColor-6',
      },
    },
  ];

  return (
    <div className='mx-auto mt-24 w-full px-4 sm:px-12'>
      {cardsData.map((eachCardData, index) => {
        console.log(
          `bg-gradient-to-r from-welcomePageGradientColor-${eachCardData.gradientColors.colorOne} bg-clip-text text-transparent to-welcomePageGradientColor-${eachCardData.gradientColors.colorTwo}`
        );

        return (
          <article key={index} className='flex'>
            <main>
              <header className='mt-16 mb-2 font-unbounded text-4xl tracking-wide text-themePrimary-50'>
                {eachCardData.header}&nbsp;
                <span
                  className={`bg-gradient-to-r ${eachCardData.gradientColors.colorOne} bg-clip-text text-transparent ${eachCardData.gradientColors.colorTwo}`}>
                  {eachCardData.headerGradientText}
                </span>
                .
              </header>
              <p className='font-mukta text-xl tracking-wide text-themePrimary-50/80 sm:w-3/4'>
                {eachCardData.description}
              </p>
            </main>
            {eachCardData.imageUrl !== undefined && (
              <main className=''>
                <Image
                  alt='image'
                  src={eachCardData.imageUrl}
                  width={500}
                  height={500}></Image>
              </main>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default WelcomePageCards;
