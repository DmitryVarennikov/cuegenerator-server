import { allowedOrigins } from '../config';
import cors from 'cors';

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
