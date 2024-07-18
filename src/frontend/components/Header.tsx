import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="flex justify-between items-centers p-5">
        <img src="/logo_Dapp.jpg" alt="Logo" className="h-20 w-20"/>
        <ConnectButton />
    </div>
  )
}

export default Header