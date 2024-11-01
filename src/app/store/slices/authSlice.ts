import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { commandId } from '@/app/providers/api/constants/client.ts';
import { TokenService } from '@/shared/services/TokenService.ts';
import { Profile } from '@/shared/api-types.ts';

const tokenService = TokenService.getInstance(commandId);

type AuthStateType = {
  isAuth: boolean;
  profile: Profile | null;
};

const initialState: AuthStateType = {
  isAuth: tokenService.checkToken(),
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (
      state,
      action: PayloadAction<{ profile: Profile; token: string }>
    ): void => {
      tokenService.setToken(action.payload.token);
      state.isAuth = true;
      state.profile = action.payload.profile;
    },
    signout: (state): void => {
      tokenService.clearToken();
      state.isAuth = false;
      state.profile = null;
      tokenService.clearToken();
    },
    signup: (
      state,
      { payload }: PayloadAction<{ profile: Profile; token: string }>
    ): void => {
      tokenService.setToken(payload.token);
      state.isAuth = true;
      state.profile = payload.profile;
    },
  },
});

export const { signin, signout, signup } = authSlice.actions;
export const authReducer = authSlice.reducer;
