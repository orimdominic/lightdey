import { createContext, useContext, useState } from 'react';
const defaultSelection = {
  state: '',
  area: '',
  street: '',
};
const UserSelectionContext = createContext();
export const useUserSelection = () => useContext(UserSelectionContext);
const UserSelectionProvider = ({ children }) => {
  const [selection, setSelection] = useState(defaultSelection);
  const setState = (s) => setSelection({ ...selection, state: s });
  const setArea = (a) => setSelection({ ...selection, area: a });
  const setStreet = (s) => setSelection({ ...selection, street: s });

  return (
    <UserSelectionContext.Provider
      value={{ selection, setState, setArea, setStreet }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};

export default UserSelectionProvider;
