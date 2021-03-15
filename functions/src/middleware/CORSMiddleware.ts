import cors from 'cors';
import { allowedOrigins } from '../config';

const corsOptions = {
  preflightContinue: true,
  origin: (
    requestOrigin: string | undefined,
    callback: (err: Error | null, origin?: boolean | string | RegExp | (string | RegExp)[] | undefined) => void
  ) => {
    callback(null, requestOrigin && allowedOrigins.includes(requestOrigin));
  },
};

export default cors(corsOptions);
