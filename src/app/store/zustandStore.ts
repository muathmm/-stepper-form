import { create } from "zustand";

// نوع البيانات للسجل
interface FormData {
  name?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  startDate?: string;
  endDate?: string;
  accountType?: string;
  idNumber?: string;
  companyName?: string;
  registrationNumber?: string;
}

// Zustand store
interface StoreState {
  data: FormData;
  records: FormData[];
  setData: (data: FormData) => void;
  addRecord: (record: FormData) => void;
  resetData: () => void;
}

export const useStore = create<StoreState>((set) => ({
  data: {},
  records: [],
  setData: (data) => set({ data }),
  addRecord: (record) =>
    set((state) => ({
      records: [...state.records, record],
    })),
  
 resetData: () => set({ data: {}, records: [] }),
}));
