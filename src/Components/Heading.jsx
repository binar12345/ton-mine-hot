import { useCoin } from "./Context/CoinContext";
import mainlogo from '../assets/fan.png'
import { useState, useEffect } from "react";
import '../App.css';
import { doc, getDoc, updateDoc } from "@firebase/firestore"; 
import { db } from "../database/firebase.js";
import "animate.css";
import overlayImage from '../assets/ton.png'


const Heading = () => {
  const { coinBalance, setCoinBalance } = useCoin();
  const [counter, setCounter] = useState(0.000000000);
  const [telegramUserId, setTelegramUserId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchCoinBalance = async () => {
      const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      setTelegramUserId(telegramUserId);

      if (telegramUserId) {
        const userDoc = await getDoc(doc(db, 'users', telegramUserId.toString()));
        if (userDoc.exists()) {
          const currentBalance = userDoc.data().coinBalance || 0;
          setCoinBalance(currentBalance);
          setCounter(currentBalance); 
        }
      }
    };

    fetchCoinBalance();
  }, [setCoinBalance]);

  useEffect(() => {
    const incrementCounter = () => {
      setCounter((prevCounter) => {
        let newCounter = prevCounter + 0.000000009;


        if (telegramUserId) {
          const userRef = doc(db, 'users', telegramUserId.toString());
          updateDoc(userRef, { coinBalance: newCounter.toFixed(9) });
        }

        return parseFloat(newCounter.toFixed(9));
      });
    };

    const interval = setInterval(incrementCounter, 100);

    return () => clearInterval(interval);
  }, [telegramUserId]);

  const handleClaim = async () => {
    if (counter >= 0.004) {
      if (telegramUserId) {
        const userRef = doc(db, 'users', telegramUserId.toString());
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const currentBalance = userDoc.data().coinBalance || 0;
          const newBalance = currentBalance + counter;
          await updateDoc(userRef, { coinBalance: newBalance.toFixed(9) });
          setCoinBalance(newBalance);
          setCounter(0.000000000); 
        }
      }
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      {showAlert && (
        <div className="fixed top-7 left-0 w-full flex items-center justify-center px-3">
          <div className="bg-red-700 text-white py-2 rounded-lg text-center">
            Claim amount too small, minimum claim amount 0.004 TON
          </div>
        </div>
      )}
      <div className="relative flex justify-center items-center mt-1 w-4/5 bg-image">
        <img
          className="cursor-pointer w-[80%] rotate-animation"
          src={mainlogo}
          alt="main-img"
        />
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[15%]"
          src={overlayImage}
          alt="overlay-img"
        />
      </div>
      <div className="text-center">
        <h1 className="text-white text-[20px] font-bold mt-4">{counter.toFixed(9)} TON</h1>
        <h2 className="text-white text-[15px] py-1">Hashrate: 1 Ghz</h2>
      </div>
      <div className="flex flex-row justify-between px-3 gap-4 w-full">
        <button 
          className="bg-zinc-900 text-[#00A9FF] rounded-lg px-8 py-2 flex-1 text-[12px] font-bold"
          onClick={handleClaim}
        >
          CLAIM TON
        </button>
        <button className="bg-[#00A9ff] text-white rounded-lg px-8 py-2 flex-1 text-[12px] font-bold">UPGRADE MINER</button>
      </div>
    </div>
  );
};

export default Heading;