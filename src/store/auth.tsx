import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn       : boolean
  colorMode        : string
  authToken        : string
  login            : () => void
  logout           : () => void
  lightTheme       : () => void
  darkTheme        : () => void
  createAuthToken  : (token: string) => void
  destroyAuthToken : () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn       : false,
            colorMode        : 'light',
            authToken        : '',
            login            : () => set({ isLoggedIn: true }),
            logout           : () => set({ isLoggedIn: false }),
            lightTheme       : () => set({ colorMode: 'light' }),
            darkTheme        : () => set({ colorMode: 'color-theme' }),
            createAuthToken  : (token: string) => set({ authToken: token }),
            destroyAuthToken : () => set({ authToken: '' })
        }),
        { name: 'auth-storage' }, // localStorage key
    ),
)

