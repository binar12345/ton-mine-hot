
import Footer from "../Components/Footer";
import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useCoin } from "../Components/Context/CoinContext";
import '../App.css';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import invite from '../assets/invite.png';
import yt from '../assets/yt.png';
import insta from '../assets/insta.png';
import tele from '../assets/tele.png';
import x from '../assets/x.png';
import { doc, getDoc, updateDoc, increment } from "@firebase/firestore";
import { db } from '../database/firebase.js';


const Earn = () => {
  const navigate = useNavigate();
  const { coinBalance, setCoinBalance } = useCoin();
  const [completedTasks, setCompletedTasks] = useState({
    twitter: false,
    telegramJoin: false,
    telegramSubscribe: false,
    youtubeSubscribe: false,
    invite3: false,
    invite5: false,
    invite10: false,
  });
  const [userId, setUserId] = useState(null);
  const [invitedUsers, setInvitedUsers] = useState(0);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (telegramUserId) {
      setUserId(telegramUserId);
      setInviteLink(`https://t.me/your_Bot_Name?start=${telegramUserId}`);
      fetchUserData(telegramUserId);
    }
  }, []);

  const fetchUserData = async (telegramUserId) => {
    try {
      const userDocRef = doc(db, 'users', telegramUserId.toString());
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCoinBalance(userData.coinBalance);
        setCompletedTasks(userData.completedTasks || {});
        setInvitedUsers(userData.invitedUsers || 0);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate back in history
  };

  const handleTaskClick = async (task, coins) => {
    if (task === 'invite3' && invitedUsers < 3) return;
    if (task === 'invite5' && invitedUsers < 5) return;
    if (task === 'invite10' && invitedUsers < 10) return;

    if (!completedTasks[task]) {
      setCoinBalance(prevBalance => prevBalance + coins);
      setCompletedTasks(prevTasks => ({
        ...prevTasks,
        [task]: true
      }));
      await updateDatabase(task, coins);
    }
  };

  const updateDatabase = async (task, coins) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId.toString());
      await updateDoc(userDocRef, {
        coinBalance: increment(coins),
        [`completedTasks.${task}`]: true
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  

  return (
    <div className="w-full h-full min-h-screen bg-black pt-4">
      <BackButton navigateBack={handleBackButtonClick} />
      <div className="text-center items-center text-white font-robot ">
        
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6  px-4 items-center text-start flex flex-row">
          <img className="w-12" src={x} alt="Twitter" />
          <a
            href="https://t.me/+Oe8Q0vOfTaFhNzYy"
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 px-4 rounded-full text-white text-[13px] ${completedTasks.twitter ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('twitter', 0.001)}
            disabled={completedTasks.twitter}
          >
            Follow Twitter Earn <span className="text-[#00A9FF] font-bold">+0.001 TON</span>
          </a>
          <div>
          {completedTasks.twitter && <FaCheckCircle className="text-green-500" />}
          </div>
          
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-2  px-4 items-center text-start flex flex-row">
        <img className="w-12" src={tele} alt="Twitter" />
          <a
            href="https://t.me/+Oe8Q0vOfTaFhNzYy"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[13px] py-2 px-4 rounded-full text-white ${completedTasks.telegramJoin ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('telegramJoin', 0.001)}
            disabled={completedTasks.telegramJoin}
          >
            Join Telegram Earn <span className="text-[#00A9FF] font-bold">+0.001 TON</span>
          </a>
          <div>
          {completedTasks.telegramJoin && <FaCheckCircle className="text-green-500" />}
          </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-2  px-4 items-center text-start flex flex-row">
        <img className="w-12" src={insta} alt="Twitter" />
          <a
            href="https://defi-dragon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[13px] py-2 px-4 rounded-full text-white ${completedTasks.telegramSubscribe ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('telegramSubscribe', 0.001)}
            disabled={completedTasks.telegramSubscribe}
          >
            Follow Instagram Earn <span className="text-[#00A9FF] font-bold">+0.001 TON</span>
          </a>
          <div>
          {completedTasks.telegramSubscribe && <FaCheckCircle className="text-green-500" />}
          </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-2  px-4 items-center text-start flex flex-row">
        <img className="w-12" src={yt} alt="Twitter" />
          <a
            href="https://www.youtube.com/@TON_MINE_HOT"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[13px] py-2 px-4 rounded-full text-white ${completedTasks.youtubeSubscribe ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('youtubeSubscribe', 0.002)}
            disabled={completedTasks.youtubeSubscribe}
          >
            Subscribe YouTube Earn <span className="text-[#00A9FF] font-bold">+0.002 TON</span>
          </a>
          <div>
          {completedTasks.youtubeSubscribe && <FaCheckCircle className="text-green-500" />}
          </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-2 px-4 items-center text-start flex flex-row">
        <img className="w-12" src={invite} alt="Twitter" />
          <a
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[13px] py-2 px-4 rounded-full text-white ${completedTasks.invite3 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('invite3', 0.002)}
            disabled={completedTasks.invite3 || invitedUsers < 3}
          >
            Invite 3 Friends Earn <span className="text-[#00A9FF] font-bold">+0.002 TON</span>
          </a>
          <div>
          {completedTasks.invite3 && <FaCheckCircle className="text-green-500" />}
          </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-2  px-4 items-center text-start flex flex-row">
        <img className="w-12" src={invite} alt="Twitter" />
          <a
            href={inviteLink}
            rel="noopener noreferrer"
            className={`text-[13px] py-2 px-4 rounded-full text-white ${completedTasks.invite5 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('invite5', 0.004)}
            disabled={completedTasks.invite5 || invitedUsers < 5}
          >
            Invite 5 Friends Earn <span className="text-[#00A9FF] font-extrabold">+0.004 TON</span>
          </a>
          <div>
          {completedTasks.invite5 && <FaCheckCircle className="text-green-500" />}
          </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-2  px-4 items-center text-start flex flex-row">
        <img className="w-12" src={invite} alt="Twitter" />
          <a
            href={inviteLink}
            rel="noopener noreferrer"
            className={`text-[13px] py-2 px-4 rounded-full text-white ${completedTasks.invite5 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleTaskClick('invite5', 0.010)}
            disabled={completedTasks.invite10 || invitedUsers < 10}
          >
            Invite 10 Friends Earn <span className="text-[#00A9FF] font-extrabold">+0.010 TON</span>
          </a>
          <div>
          {completedTasks.invite5 && <FaCheckCircle className="text-green-500" />}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Earn;
