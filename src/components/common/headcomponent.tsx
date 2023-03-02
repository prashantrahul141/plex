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
        <meta content='/static/cardimage.png' property='og:image' />
        <meta content='#141d31' data-react-helmet='true' name='theme-color' />

        <meta name='twitter:card' content='/static/cardimage.png' />
        <meta property='twitter:domain' content='plex-social.vercel.app' />
        <meta property='twitter:url' content='https://plex-social.vercel.app' />
        <meta name='twitter:title' content='Plex' />
        <meta name='twitter:description' content='Get together with Plex.' />
        <meta name='twitter:image' content='/static/cardimage.png' />
      </Head>
    </>
  );
};

export default HeadComp;
