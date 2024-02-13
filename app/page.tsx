import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Next',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/output-1.jpg`,
    aspectRatio: '1.91:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Bee Movie Frame',
  description: "Because bees don't care what humans think is impossible.",
  openGraph: {
    title: 'Bee Movie Frame',
    description: "Because bees don't care what humans think is impossible.",
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1></h1>
    </>
  );
}
