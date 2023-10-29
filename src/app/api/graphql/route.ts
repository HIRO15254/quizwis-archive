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
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
