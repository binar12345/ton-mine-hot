import { useCoin } from "./Context/CoinContext"; 
import logo from '../assets/ton.png';

const Navbar = () => {

  const { coinBalance } = useCoin();


  const coinToDollar = (balance) => {
    const conversionRate = 0.00000001;
    return (balance * conversionRate).toFixed(9);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center bg-zinc-900 py-2 px-3 rounded-xl">
        <div className="flex items-center gap-2">
          <img className="w-8" src={logo} alt="logo" />
          <div>
            <h1 className="text-white font-bold text-sm">TON</h1>
            <div className='flex gap-2'>
              <p className='text-white opacity-50 text-[10px]'>
                {coinBalance.toFixed(4)} TON
              </p>
              <p className='text-white opacity-50 text-[10px]'>
                ${coinToDollar(coinBalance)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className='bg-[#00A9FF] px-3 py-1 text-white rounded-full text-[12px] font-bold'>
            Withdraw
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
