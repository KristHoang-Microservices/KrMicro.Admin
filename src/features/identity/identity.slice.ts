import {
  CaseReducerActions,
  createSlice,
  PayloadAction,
  Reducer,
  Slice,
} from "@reduxjs/toolkit";

import { UserModel } from "../../api/identity/models";
import { RootState } from "../../app/store";
import { localStorageService } from "../../services";
import { identityLocalStorageKey } from "./constants";

export interface IdentityState {
  accessToken: string | null;
  accountGeneralInfo: UserModel | null;
  fetchingInfo: boolean;
}

const initialState: IdentityState = {
  accessToken: null,
  accountGeneralInfo: null,
  fetchingInfo: false,
};

const identitySlice: Slice<
  IdentityState,
  {
    setAccessToken: (
      state: IdentityState,
      action: PayloadAction<string>,
    ) => void;

    setFetchingInfo: (
      state: IdentityState,
      action: PayloadAction<boolean>,
    ) => void;

    setAccountGeneralInfo: (
      state: IdentityState,
      action: PayloadAction<UserModel>,
    ) => void;

    removeIdentityState: (state: IdentityState) => void;
  },
  "identity"
> = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setAccessToken(state: IdentityState, action: PayloadAction<string>) {
      state.accessToken = action.payload;

      localStorageService.set(
        identityLocalStorageKey.ACCESS_TOKEN,
        action.payload,
      );
    },

    setFetchingInfo(state: IdentityState, action: PayloadAction<boolean>) {
      state.fetchingInfo = action.payload;
    },

    setAccountGeneralInfo(
      state: IdentityState,
      action: PayloadAction<UserModel>,
    ) {
      state.accountGeneralInfo = { ...action.payload };
    },

    removeIdentityState(state: IdentityState) {
      state.accessToken = null;
      state.accountGeneralInfo = null;

      localStorageService.remove(identityLocalStorageKey.ACCESS_TOKEN);
    },
  },
});

export const {
  setAccessToken,
  setFetchingInfo,
  setAccountGeneralInfo,
  removeIdentityState,
}: CaseReducerActions<
  {
    setAccessToken: (
      state: IdentityState,
      action: PayloadAction<string>,
    ) => void;

    setFetchingInfo: (
      state: IdentityState,
      action: PayloadAction<boolean>,
    ) => void;

    setAccountGeneralInfo: (
      state: IdentityState,
      action: PayloadAction<UserModel>,
    ) => void;

    removeIdentityState: (state: IdentityState) => void;
  },
  "identity"
> = identitySlice.actions;

export const identityReducer: Reducer<IdentityState> = identitySlice.reducer;

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.identity.accessToken !== null;

export const selectAccessToken = (state: RootState): string | null =>
  state.identity.accessToken;

export const selectAccountGeneralInfo = (state: RootState): UserModel | null =>
  state.identity.accountGeneralInfo;

export const selectFetchingInfo = (state: RootState): boolean =>
  state.identity.fetchingInfo;
