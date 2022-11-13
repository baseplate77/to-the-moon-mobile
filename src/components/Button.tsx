import React from "react";
import { formatAddress } from "../helper";

interface ButtonProps {}

export const Button = ({}: ButtonProps) => {
  const [isConnected, setisConnected] = React.useState(false);
  const [address, setaddress] = React.useState("");

  const connectWallet = async () => {
    if (!window.tronWeb) return;

    const currentaddress = window.tronWeb.defaultAddress.base58;

    setaddress(currentaddress);
    setisConnected(true);

    const balance = await window.tronWeb.trx.getAccount(currentaddress);

    console.log("balance: ", balance);
  };

  return (
    <>
      {isConnected ? (
        <div>
          <div className="hidden sm:block tracking-wider px-4 py-2  rounded-lg backdrop-blur-sm bg-opacity-20 bg-white">
            {formatAddress(address)}
          </div>
        </div>
      ) : (
        <button
          className="hidden sm:block tracking-wider px-8 py-2  rounded-lg backdrop-blur-sm bg-opacity-20 bg-white"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};
