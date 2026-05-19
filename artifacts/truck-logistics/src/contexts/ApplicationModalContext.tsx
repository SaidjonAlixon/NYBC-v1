import { createContext, useContext, useState } from "react";

interface ApplicationModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ApplicationModalContext = createContext<ApplicationModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ApplicationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ApplicationModalContext.Provider
      value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}
    >
      {children}
    </ApplicationModalContext.Provider>
  );
}

export function useApplicationModal() {
  return useContext(ApplicationModalContext);
}
