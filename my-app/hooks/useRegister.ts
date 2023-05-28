import { create } from 'zustand';

interface RegisterStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegister = create<RegisterStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRegister;