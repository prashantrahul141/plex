import Image from 'next/image';
import type { FC } from 'react';
import WelcomePageButton from './buttons';
import type { NextRouter } from 'next/router';
import Link from 'next/link';

const WelcomePageCards: FC<{ router: NextRouter }> = ({ router }) => {
  const cardsData: Array<{
    imageUrl: string;
    imageAttributionName: string;
    imageAttribution: string;
    header: string;
    headerGradientText: string;
    description: string;
    textGradientColors: { colorOne: string; colorTwo: string };
  }> = [
    {
      imageUrl: '/static/welcomepage_friends.jpg',
      imageAttributionName: 'lobosnico',
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
    },
    {
      imageUrl: '/static/welcomepage_family.jpg',
      imageAttributionName: 'pablomerchanm',
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
    },
  ];

  return (
    <div className='mt-24'>
      {cardsData.map((eachCardData, index) => {
        return (
          <div key={index} className='w-full'>
            <article className='relative w-full'>
              <Image
                className={`-z-10 h-full select-none blur-[2px] brightness-[0.4] sm:w-full`}
                alt='image'
                src={eachCardData.imageUrl}
                width={1000}
                height={1000}></Image>

              <header className='absolute left-1/2 top-1/3 w-full max-w-2xl -translate-x-1/2 px-2 text-center sm:top-1/2 sm:px-0'>
                <h1 className='mx-auto font-unbounded text-lg tracking-wide text-themePrimary-50 sm:text-4xl'>
                  {eachCardData.header}&nbsp;
                  <span
                    className={`bg-gradient-to-r ${eachCardData.textGradientColors.colorOne} ${eachCardData.textGradientColors.colorTwo} bg-clip-text text-transparent`}>
                    {eachCardData.headerGradientText}
                  </span>
                </h1>
                <p className='mt-2 font-mukta text-sm leading-tight tracking-wide text-themePrimary-50/90 sm:text-base'>
                  {eachCardData.description}
                </p>
              </header>
              <div className='absolute bottom-0 left-0'>
                <span className='text-themePrimary-50/30 hover:text-themePrimary-50/70 hover:underline'>
                  Image by&nbsp;
                  <Link
                    target={'_blank'}
                    passHref={true}
                    href={eachCardData.imageAttribution}>
                    {eachCardData.imageAttributionName}
                  </Link>
                </span>
              </div>
            </article>
          </div>
        );
      })}
      <div className='flex h-screen w-full items-center justify-center'>
        <article className=''>
          <header className='mx-auto font-unbounded text-lg tracking-wide text-themePrimary-50 sm:text-4xl'>
            Get together with&nbsp;
            <span
              className={`bg-gradient-to-r  from-welcomePageGradientColor-5 to-welcomePageGradientColor-6 bg-clip-text text-transparent`}>
              Plex
            </span>
            .
          </header>
          <WelcomePageButton router={router}></WelcomePageButton>
        </article>
      </div>
    </div>
  );
};

export default WelcomePageCards;
