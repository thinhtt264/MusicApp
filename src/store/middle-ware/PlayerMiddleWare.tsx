import { Middleware } from '@reduxjs/toolkit';
import { homeActions, playerActions } from '../action-slices';

export const playerMiddleware: Middleware =
  store => next => (action: { type: string; payload: any }) => {
    if (action.type === playerActions.onSetCurrentTrack.type) {
      const payload = action.payload;
      store.dispatch(homeActions.addSearchRecentList(payload));
    }

    return next(action);
  };
