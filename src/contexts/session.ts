import React from 'react';

import Session from '../types/session';

export default React.createContext<
  | undefined
  | {
      session?: Session;
      updateSession?: (session: Session) => void;
    }
>(undefined);
