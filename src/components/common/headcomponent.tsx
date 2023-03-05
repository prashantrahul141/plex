import Head from 'next/head';
import type { FC } from 'react';

const HeadComp: FC<{ headTitle?: string }> = ({ headTitle = undefined }) => {
  // Head component to define meta tags
  return (
    <>
      <Head>
        {headTitle === undefined ? (
          <title>{`Plex`}</title>
        ) : (
          <title>{`Plex | ${headTitle}`}</title>
        )}

        <link rel='manifest' href='/manifest.json'></link>
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png'></link>
        <meta
          name='viewport'
          content='width=device-width, user-scalable=no'></meta>
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'></meta>
        <meta name='theme-color' content='#141d31'></meta>

        <meta name='darkreader-lock' />

        <meta name='title' charSet='UTF-8' content='Plex' />
        <meta
          name='description'
          charSet='UTF-8'
          content='Get together with Plex.'
        />

        <meta content='Plex' property='og:title' />
        <meta content='Get together with Plex.' property='og:description' />
        <meta content='https://plex-social.vercel.app/' property='og:url' />
        <meta
          content='https://plex-social.vercel.app/_next/image?url=%2Fstatic%2Fcardimage.webp&w=1080&q=75'
          property='og:image'
        />
        <meta content='#141d31' data-react-helmet='true' name='theme-color' />

        <meta
          name='twitter:card'
          content='https://plex-social.vercel.app/_next/image?url=%2Fstatic%2Fcardimage.webp&w=1080&q=75'
        />
        <meta property='twitter:domain' content='plex-social.vercel.app' />
        <meta property='twitter:url' content='https://plex-social.vercel.app' />
        <meta name='twitter:title' content='Plex' />
        <meta name='twitter:description' content='Get together with Plex.' />
        <meta
          name='twitter:image'
          content='https://plex-social.vercel.app/_next/image?url=%2Fstatic%2Fcardimage.webp&w=1080&q=75'
        />
      </Head>
    </>
  );
};

export default HeadComp;
