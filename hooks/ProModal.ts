import { useProModalStore } from "./store";

export const useProModal = () => {
  const isOpen = useProModalStore((state) => state.isOpen);
  const closeModal = () => {
    useProModalStore.setState({ isOpen: false });
  };
  const openModal = () => {
    useProModalStore.setState({ isOpen: true });
  };

  return { isOpen, closeModal, openModal };
};
