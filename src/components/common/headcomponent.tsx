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

        <meta
          name='description'
          charSet='UTF-8'
          content='A Social Media Application.'
        />
        {/* <link rel='manifest' href='/manifest.json'></link> */}
        <meta name='darkreader-lock' />
        <meta content='Plex' property='og:title' />
        <meta content='Get together.' property='og:description' />
        <meta content='http://localhost:3000' property='og:url' />
        <meta content='' property='og:image' />
        <meta content='#448fef' data-react-helmet='true' name='theme-color' />
      </Head>
    </>
  );
};

export default HeadComp;
