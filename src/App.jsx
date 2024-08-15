import { useEffect } from 'react';
import './Components/amination.css'
import AppRoutes from './Routes';
import { CoinProvider } from './Components/Context/CoinContext';
import { db } from './database/firebase'; 
import { doc, setDoc, getDoc } from '@firebase/firestore';






export default function App() {

  
  useEffect(() => {
    const initializeApp = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
        const userName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name;

        const userRef = doc(db, 'users', chatId.toString());
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          const newUser = {
            chatId: chatId,
            firstName: userName,
            coinBalance: 0,
            referral_link: `https://t.me/your_Bot_Name?start=${chatId}`,
            referId:  null
          };
          await setDoc(userRef, newUser);


        } 
      }
    };

    initializeApp();
  }, []);
  


  return (
    <CoinProvider>
    
    <div className='bg-black  w-full '>
    <AppRoutes />
    </div>

    </CoinProvider>
  )
}