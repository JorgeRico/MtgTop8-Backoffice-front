import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn       : boolean
  colorMode        : string
  light            : string
  dark             : string
  authToken        : string
  login            : () => void
  logout           : () => void
  colorTheme       : (color: string) => void
  createAuthToken  : (token: string) => void
  destroyAuthToken : () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn       : false,
            colorMode        : 'light',
            light            : 'light',
            dark             : 'dark',
            authToken        : '',
            login            : () => set({ isLoggedIn: true }),
            logout           : () => set({ isLoggedIn: false }),
            colorTheme       : (color: string) => set({ colorMode: color }),
            createAuthToken  : (token: string) => set({ authToken: token }),
            destroyAuthToken : () => set({ authToken: '' })
        }),
        { name: 'auth-storage' }, // localStorage key
    ),
)

