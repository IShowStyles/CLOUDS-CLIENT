import { create } from 'zustand';
import { $api } from '@/service/http';

type UserType = {
  name: string;
  email: string;
};

type State = {
  user: UserType;
  isLoggedIn: boolean;
  isLoading: boolean;
  isActivated: boolean;
};

type Actions = {
  setUser: (user: UserType) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  checkAuth: (email: string, accessToken: string, refreshToken: string) => Promise<void>;
  logout: (email: string) => void;
  login: (email: string, password: string) => Promise<void>;
  setStatusActive: (status: boolean) => void;
};

const initialState: State = {
  user: {
    name: '',
    email: '',
  },
  isLoggedIn: false,
  isLoading: true,
  isActivated: false,
};

const userStore = create<State & Actions>((set) => ({
  ...initialState,
  setUser: (user: UserType) =>
    set({
      user: {
        name: user.name,
        email: user.email,
      },
    }),
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  checkAuth: async (email: string, accessToken: string, refreshToken: string) => {
    initialState.isLoading = true;
    try {
      await $api
        .post('/auth/check', { email: email, accessToken: accessToken, refreshToken: refreshToken })
        .then((res) => {
          console.log(res, 'res');
          if (res.data) {
            set({ isLoggedIn: true });
          } else {
            set({ isLoggedIn: false });
            localStorage.removeItem('access_token');
          }
        });
    } catch (e) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async (email: string) => {
    try {
      await $api.post('/auth/logout', { email: email }).then((res) => console.log(res));
      localStorage.removeItem('access_token');
      // localStorage.removeItem('user');
      // localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  },
  login: async (email: string, password: string) =>
    await $api
      .post('/auth/local/signin', {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('isActivated', response.data.isActived);
      }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setStatusActive: async (status: boolean) => set({ isActivated: status }),
}));

export default userStore;
