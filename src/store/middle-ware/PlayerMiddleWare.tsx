import { Middleware } from '@reduxjs/toolkit';
import { playerActions, searchActions } from '../action-slices';

export const playerMiddleware: Middleware =
  store => next => (action: { type: string; payload: any }) => {
    if (action.type === playerActions.onSetCurrentTrack.type) {
      const payload = action.payload;
      store.dispatch(searchActions.addSearchRecentList(payload));
    } else if (action.type === searchActions.removeSearchRecentList.type) {
      const payload = action.payload;
      store.dispatch(playerActions.onRemoveCurrentTrack(payload));
    }

    return next(action);
  };
