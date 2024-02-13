import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const currentPage = parseInt(req.nextUrl.searchParams.get('page') || '1');

  const body: FrameRequest = await req.json();
  const { message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (currentPage === 1) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Previous',
          },
          {
            label: 'Next',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/output-2-.jpg`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame?page=2`,
      }),
    );
  }

  const requestedPage = message?.button === 1 ? currentPage - 1 : currentPage + 1;

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Previous',
        },
        {
          label: 'Next',
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/output-${requestedPage}.jpg`,
        aspectRatio: '1.91:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?page=${requestedPage}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
