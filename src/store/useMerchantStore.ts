// store/useMerchantStore.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Merchant } from '../shared.types'

interface MerchantStore {
  merchant: Merchant | null
  setMerchant: (merchant: Merchant) => void
  clearMerchant: () => void
  logout: () => void // Adding the logout function here
}

export const useMerchantStore = create(
  persist<MerchantStore>(
    (set) => ({
      merchant: null,
      setMerchant: (data) => set({ merchant: data }),
      clearMerchant: () => set({ merchant: null }),
      logout: () => {
        set({ merchant: null }) // Clear the merchant data
        sessionStorage.removeItem('auth-storage') // Optionally remove from session storage directly
      },
    }),
    {
      name: 'auth-storage', // Name of the storage (localStorage key)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
