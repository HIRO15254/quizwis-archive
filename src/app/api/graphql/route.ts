import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { server } from '../../../backend/lib/apollo';
import { createContext } from '../../../backend/lib/context';

const handler = startServerAndCreateNextHandler(
  server,
  {
    context: createContext,
  },
);

export async function GET(request: Request) {
  const res = await handler(request);
  return res;
}

export async function POST(request: Request) {
  const res = await handler(request);
  return res;
}
