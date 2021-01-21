import { createContext, useContext, useState } from 'react';
const defaultSelection = {
  state: '',
  area: '',
  street: '',
};
const UserLocationContext = createContext();
export const useUserLocationContext = () => useContext(UserLocationContext);
const UserLocationProvider = ({ children }) => {
  const [selection, setSelection] = useState(defaultSelection);
  const setState = (s) => setSelection({ ...selection, state: s });
  const setArea = (a) => setSelection({ ...selection, area: a });
  const setStreet = (s) => setSelection({ ...selection, street: s });

  return (
    <UserLocationContext.Provider
      value={{ selection, setState, setArea, setStreet }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;
