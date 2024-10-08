import React, { useState, useEffect } from "react";
import bountyimg from "../images/bountyimg.png";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  const initialTime = 8 * 60 * 60; // 8 hours in seconds
  const [bountyAmount, setBountyAmount] = useState(
    localStorage.getItem("bountyAmount") ? parseFloat(localStorage.getItem("bountyAmount")) : 1000.0
  );
  const [timeLeft, setTimeLeft] = useState(
    localStorage.getItem("timeLeft") ? parseInt(localStorage.getItem("timeLeft")) : initialTime
  );
  const [isFarming, setIsFarming] = useState(
    localStorage.getItem("isFarming") === "true" // Retrieve farming status
  );
  const [taps, setTaps] = useState(
    localStorage.getItem("taps") ? parseInt(localStorage.getItem("taps")) : 100
  );
  const [floatingPlusPosition, setFloatingPlusPosition] = useState(null); // Position for floating +1

  // Function to format time from seconds to hh:mm:ss
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Update time left based on the saved start time
  useEffect(() => {
    if (isFarming) {
      const savedStartTime = localStorage.getItem("startTime");
      const elapsedTime = Math.floor((Date.now() - savedStartTime) / 1000); // Time elapsed in seconds
      const newTimeLeft = Math.max(initialTime - elapsedTime, 0); // Calculate remaining time

      setTimeLeft(newTimeLeft);
      localStorage.setItem("timeLeft", newTimeLeft); // Update timeLeft in localStorage

      if (newTimeLeft === 0) {
        setIsFarming(false); // Stop farming
        setTaps(100); // Reset taps to 100
        localStorage.setItem("taps", 100); // Reset taps in localStorage
      }
    }
  }, [isFarming]);

  // Timer countdown effect
  useEffect(() => {
    let timer;
    if (isFarming && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const updatedTime = prevTime - 1;
          localStorage.setItem("timeLeft", updatedTime);
          return updatedTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isFarming, timeLeft]);

  // Save bounty amount to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bountyAmount", bountyAmount);
  }, [bountyAmount]);

  // Handle start farming
  const handleStartFarming = () => {
    if (timeLeft === 0) {
      setTimeLeft(8*60*60); // Reset to 8 hours
      setTaps(100); // Reset taps to 100
      localStorage.setItem("taps", 100); // Reset taps in localStorage
    }
    setIsFarming(true); // Start farming
    localStorage.setItem("isFarming", "true"); // Update farming status in localStorage
    localStorage.setItem("startTime", Date.now()); // Save the current time
  };

  // Handle tap on the image
  const handleImageTap = () => {
    if (taps > 0) {
      setBountyAmount((prevAmount) => prevAmount + 1); // Increase bounty by 1
      setTaps((prevTaps) => {
        const newTaps = prevTaps - 1; // Decrease tap count
        localStorage.setItem("taps", newTaps); // Update taps in localStorage
        return newTaps;
      });

      // Randomly position the floating +1 around the image
      const randomX = Math.random() * 50 + 25; // Random X between 25% and 75%
      const randomY = Math.random() * 40 + 10; // Random Y between 10% and 50%
      setFloatingPlusPosition({ x: randomX, y: randomY });

      // Hide floating +1 after 1 second
      setTimeout(() => {
        setFloatingPlusPosition(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[70vh] bg-[#1f221f] text-white p-4 overflow-hidden">
      {(userInfo.first_name || userInfo.username) ? (
        <div className="w-full flex text-left px-4 ">
          <h2 className="font-bold text-lg md:text-xl">
            Welcome, {userInfo.first_name || userInfo.username}!
          </h2>
        </div>
      ) : null}

      {/* Countdown and Taps */}
      <div className="flex space-x-4 p-3 items-center justify-start w-full rounded-lg text-xs ">
        <div className="bg-gradient-to-r from-black to-[#7d5126] px-8 py-3 rounded-lg font-bold">
          {formatTime(timeLeft)} Left
        </div>
        <div className="px-3 py-3 rounded-md border border-[#7d5126]">
          {taps} Taps
        </div>
      </div>

      {/* Image of coins */}
      <div className="relative mt-4 w-full flex justify-center" onClick={handleImageTap}>
        <img
          src={bountyimg}
          alt="Bounty Token"
          className="w-2/3 md:w-1/2 h-auto object-contain cursor-pointer"
        />
        {/* Floating +1 */}
        {floatingPlusPosition && (
          <div
            className="floating-plus absolute text-lg text-green-500"
            style={{
              left: `${floatingPlusPosition.x}%`,
              top: `${floatingPlusPosition.y}%`,
            }}
          >
            +1
          </div>
        )}
      </div>

      {/* Bounty Token Info */}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold">{bountyAmount.toFixed(2)} BNTY</h2>
        <p className="text-gray-400">Bounty Token</p>
      </div>

      {/* Start Farming Button */}
      <button
        className="bg-gradient-to-r fixed bottom-24 from-black to-[#7d5126] px-8 py-3 rounded-lg w-full text-lg font-bold"
        onClick={handleStartFarming}
        disabled={isFarming && timeLeft > 0} // Disable button while farming
      >
        {isFarming ? "Farming in Progress..." : "Start Farming"}
      </button>
    </div>
  );
};

export default Home;
