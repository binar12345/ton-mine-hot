import { createContext, useState, useContext } from 'react';


const CoinContext = createContext();


export const CoinProvider = ({ children }) => {
  const [coinBalance, setCoinBalance] = useState(0);

  return (
    <CoinContext.Provider value={{ coinBalance, setCoinBalance }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoin = () => {
  return useContext(CoinContext);
};
