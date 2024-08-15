import Footer from "../Components/Footer";
import BackButton from "../Components/BackButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../database/firebase.js";
import { collection, query, where, getDocs } from "@firebase/firestore";

const About = () => {
  const navigate = useNavigate();
  const [claimHistory, setClaimHistory] = useState([]);

  const handleBackButtonClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchClaimHistory = async () => {
      const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

      if (telegramUserId) {
        try {
          const claimsRef = collection(db, 'claims');
          const q = query(claimsRef, where("userId", "==", telegramUserId));
          const querySnapshot = await getDocs(q);
          const history = querySnapshot.docs.map(doc => doc.data());
          setClaimHistory(history);
        } catch (error) {
          console.error("Error fetching claim history:", error);
        }
      }
    };

    fetchClaimHistory();
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-black">
      <BackButton navigateBack={handleBackButtonClick} />
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-white text-2xl font-bold mb-4">Claim History</h1>
        <div className="bg-gray-800 p-4 rounded-lg">
          {claimHistory.length === 0 ? (
            <p className="text-white text-center">No claims made yet.</p>
          ) : (
            <ul>
              {claimHistory.map((claim, index) => (
                <li key={index} className="text-white mb-2">
                  <span className="font-bold">Amount:</span> {claim.amount} TON
                  <br />
                  <span className="font-bold">Date:</span> {new Date(claim.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
