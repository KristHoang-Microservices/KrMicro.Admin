import { AnyAction, configureStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import {
  identityReducer,
  IdentityState,
} from "../features/identity/identity.slice";

export const store: ToolkitStore<
  {
    identity: IdentityState;
  },
  AnyAction,
  [
    ThunkMiddleware<{
      identity: IdentityState;
    }>,
  ]
> = configureStore({
  reducer: {
    identity: identityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
