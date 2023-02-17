import type { FC } from 'react';
import Link from 'next/link';

const ProfileViewBio: FC<{ bioText: string | null }> = ({ bioText }) => {
  const parseBio = (text: string) => {
    const bioArray = text.split(' ');
    const resultedBio: Array<JSX.Element> = [];

    for (let i = 0; i < bioArray.length; i++) {
      const element = bioArray[i];
      if (element) {
        try {
          const bioUrl = new URL(element);
          resultedBio.push(
            <Link
              className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
              key={i}
              title={bioUrl.origin}
              href={bioUrl.href}>
              {`${bioUrl.hostname} `}
            </Link>
          );
          continue;
        } catch {}

        const startLetter = element[0];
        if (startLetter) {
          if (startLetter === '@') {
            resultedBio.push(
              <Link
                className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
                key={i}
                title={element}
                href={`/${element.substring(1, element.length)}`}>
                {`${element} `}
              </Link>
            );
            continue;
          }
        }

        resultedBio.push(<span key={i}>{`${element} `}</span>);
      }
    }

    return resultedBio;
  };

  if (bioText) {
    return (
      <span className='mb-1 block whitespace-pre-line font-mukta font-thin leading-snug tracking-wide text-themePrimary-50/95'>
        {parseBio(bioText)}
      </span>
    );
  }
  return <></>;
};

export default ProfileViewBio;
