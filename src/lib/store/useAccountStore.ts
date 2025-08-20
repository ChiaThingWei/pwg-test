import { create } from "zustand"
import { getAllAccountsApi } from "../api/account"
import type { Account } from "../api/account"

type AccountState = {
  accounts: Account[]
  totalAccounts: number
  loading: boolean
  error: string | null
  fetchAccounts: () => Promise<void>
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: [],
  totalAccounts: 0,
  loading: false,
  error: null,
  fetchAccounts: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getAllAccountsApi()
     
      set({
        accounts: data,
        totalAccounts: data.length,
        loading: false
      })
    } catch (err) {
      if (err instanceof Error) set({ error: err.message, loading: false })
      else set({ error: "Unknown error", loading: false })
    }
  }
}))
