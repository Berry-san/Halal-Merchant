// store/useMerchantStore.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Merchant } from '../shared.types'

interface MerchantStore {
  merchant: Merchant | null
  setMerchant: (merchant: Merchant) => void
  clearMerchant: () => void
}

export const useMerchantStore = create(
  persist<MerchantStore>(
    (set) => ({
      merchant: null,
      setMerchant: (data) => set({ merchant: data }),
      clearMerchant: () => set({ merchant: null }),
    }),
    {
      name: 'auth-storage', // Name of the storage (localStorage key)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
