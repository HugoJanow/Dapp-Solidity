import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="flex justify-between items-centers p-5">
        <div className="grow">Logo</div>
        <ConnectButton />
    </div>
  )
}

export default Header