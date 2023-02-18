import type { FC } from 'react';
import Link from 'next/link';

const ProfileViewBio: FC<{ bioText: string | null }> = ({ bioText }) => {
  const parseBio = (text: string) => {
    const bioArrayLines = text.split('\n');

    const bioArray: Array<string[]> = [];
    for (let i = 0; i < bioArrayLines.length; i++) {
      const element = bioArrayLines[i];
      if (element) {
        bioArray.push(element.split(' '));
      }
    }

    const resultedBio: Array<JSX.Element> = [];
    for (let i = 0; i < bioArray.length; i++) {
      const element = bioArray[i];

      if (element) {
        for (let j = 0; j < element.length; j++) {
          const childElement = element[j];

          if (childElement) {
            try {
              const bioUrl = new URL(childElement);
              resultedBio.push(
                <>
                  <Link
                    className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
                    key={i}
                    title={bioUrl.origin}
                    href={bioUrl.href}>
                    {`${bioUrl.hostname}`}
                  </Link>
                  <span> </span>
                </>
              );
              continue;
            } catch {}

            const startLetter = childElement[0];
            if (startLetter) {
              if (startLetter === '@') {
                resultedBio.push(
                  <>
                    <Link
                      className='font-ibmplex leading-tight tracking-tighter text-themePrimary-300 hover:underline'
                      key={i}
                      title={childElement}
                      href={`/${childElement.substring(
                        1,
                        childElement.length
                      )}`}>
                      {`${childElement}`}
                    </Link>
                    <span> </span>
                  </>
                );
                continue;
              }
            }

            resultedBio.push(
              <>
                <span key={i}>{`${childElement}`}</span>
                <span> </span>
              </>
            );
          }
        }
        resultedBio.push(<span>{'\n'}</span>);
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
