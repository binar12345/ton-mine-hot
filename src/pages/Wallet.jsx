import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import '../App.css';
import logo from '../assets/fan.png'
import { TonConnectButton,  useTonWallet } from '@tonconnect/ui-react';
import ton from '../assets/ton.png';

import Footer from '../Components/Footer';





const Wallet = () => {
  const navigate = useNavigate();
  const wallet = useTonWallet();



  


  const handleBackButtonClick = () => {
    navigate('/'); // Navigate back in history
  };

 

  return (
    <div className='w-full h-full min-h-screen bg-black'>
    <BackButton navigateBack={handleBackButtonClick} />
    <div className='container'>
    <div className="h-screen bg-black pt-8 w-auto">
      <div className='items-center text-center justify-center'>
        <img className='w-[50%] inline' src={logo} alt="logo" onClick={handleBackButtonClick}/>
      </div>
      <div className='items-center text-center justify-center mt-7'>
        <div>
          <h1 className='text-[35px] font-bold bg-slate-700   bg-clip-text text-transparent'>Airdrop Task</h1>
          <p className='text-white text-center px-5'>Listing is on the way. Tasks will appear below. Complete them to participate in the Airdrop</p>
        </div>
        <div className='mt-4'>
          <TonConnectButton className="mt-[30px] ml-[80px] text-[20px] flex flex-row text-white font-bold items-center text-center py-4 px-8 rounded-xl bg-gradient-to-r from-slate-600  to-slate-900 " />
        </div>
        {wallet && (
          <div className='mt-4 text-white'>
            <p>Connected wallet: {wallet.name}</p>
          </div>
        )}

<div className='blurbox backdrop-blur-sm rounded-lg mx-8 mt-5 text-white p-2'>
              <button className='flex justify-between w-full' >
                <h1 className='flex-1 text-left'>2x <span className='opacity-50'>More Coins</span></h1>
                <div className='flex items-center'>
                  <img className='w-6 h-6' src={ton} alt="ton" />
                  <h1 className='font-bold ml-2'>1 TON</h1>
                </div>
              </button>
            </div>
            <div className='blurbox backdrop-blur-sm rounded-lg mx-8 mt-5 text-white p-2'>
              <button className='flex justify-between w-full' >
                <h1 className='flex-1 text-left'>3x <span className='opacity-50'>More Coins</span></h1>
                <div className='flex items-center'>
                  <img className='w-6 h-6' src={ton} alt="ton" />
                  <h1 className='font-bold ml-2'>3 TON</h1>
                </div>
              </button>
            </div>
            <div className='blurbox backdrop-blur-sm rounded-lg mx-8 mt-5 text-white p-2'>
              <button className='flex justify-between w-full' >
                <h1 className='flex-1 text-left'>5x <span className='opacity-50'>More Coins</span></h1>
                <div className='flex items-center'>
                  <img className='w-6 h-6' src={ton} alt="ton" />
                  <h1 className='font-bold ml-2'>5 TON</h1>
                </div>
              </button>
            </div>
        
      </div>
    </div>
    </div>
    
      <Footer />
  </div>
    
  )
}

export default Wallet