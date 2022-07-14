//import Header from "./Header"
//import Content from "./Content"
//import Banner from "./Banner"
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

const CoinbaseWallet = new WalletLinkConnector({
 url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
 appName: "Web3-react Demo",
 supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
 rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
 bridge: "https://bridge.walletconnect.org",
 qrcode: true,
});

const Injected = new InjectedConnector({
 supportedChainIds: [1, 3, 4, 5, 42]
});

function App(){

  const { activate, deactivate } = useWeb3React();

  const { active, chainId, account } = useWeb3React();

  const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

  const client = new SkynetClient(portal);

  const { publicKey } = genKeyPairFromSeed("you should not be reading this super private secure seed phrase");
  const { privateKey } = genKeyPairFromSeed("you should not be reading this super private secure seed phrase");

  const dataKey = "myApp";
  const json = { example: "Hello." };

  console.log("publicKey", publicKey);

  async function getJSONExample() {
    let _publicKey = document.getElementById("workerPublicKey").value;
    try {
      const { data, dataLink } = await client.db.getJSON(_publicKey, dataKey);
      document.getElementById("ret-skylink").value = dataLink.toString().substring(6);
    } catch (error) {
      console.log(error);
    }
  }

  async function setJSONExample() {
    try {
      await client.db.setJSON(privateKey, dataKey, { example: document.getElementById("workerFileKey").value });
    } catch (error) {
      console.log(error);
    }
  }

  function getText() {
    return document.getElementById("text-field").value;
  }

  return (
    <div>
      <div id="warning" className="bg-orange-300 text-black text-5xl text-center py-10">(This application is being developed, but feel free to use these demo features)</div>
      <div id="header" className="bg-neutral-100 relative top-0 w-full text-5xl h-16">
        <p className="inline-block align-middle text-center w-full">SIDEHUSTLES</p>
      </div>
      <div id="body">
        <div id="row-boxes" className="bg-white flex flex-row items-center space-x-16 place-content-center py-8 w-full h-3/5">
        <div id="box-0" className="bg-neutral-100 h-3/5 w-1/4">
          <button className="w-full text-left" onClick={() => { activate(CoinbaseWallet) }}>[ Coinbase Wallet ]</button>
          <button className="w-full text-left" onClick={() => { activate(WalletConnect) }}>[ Wallet Connect ]</button>
          <button className="w-full text-left" onClick={() => { activate(Injected) }}>[ Metamask ]</button>
          <button className="w-full text-left" onClick={deactivate}>[ Disconnect] </button>
          <div>{"Connection Status: "+active}</div>
          <div>{account}</div>
        </div>
        <div id="box-1" className="bg-neutral-100 h-3/5 w-1/4">
            <div className="flex flex-row">
              <p className="w-1/4">Public Key:</p>
              <input value={publicKey} disabled={true} placeholder="[ ... ]" className="bg-neutral-200 w-3/4"></input>
            </div>
            <div className="flex flex-row">
              <p className="w-1/4">Private Key:</p>
              <input value={privateKey} disabled={true} placeholder="[ ... ]" className="bg-neutral-200 w-3/4"></input>
            </div>
            <button className="w-full text-left" onClick={() => { setJSONExample();}}>[ Read public key from contract (WORKERS') ]</button>
            <input id="ret-pubKey" disabled={true} placeholder="[ ... ]" className="bg-neutral-200 w-full"></input>
            <button className="w-full text-left" onClick={() => { setJSONExample();}}>[ Read public key from contract (REQUESTORS') ]</button>
            <input id="ret-pubKey" disabled={true} placeholder="[ ... ]" className="bg-neutral-200 w-full"></input>
        </div>
        <div id="box-2" className="bg-neutral-100 h-3/5 w-1/4">
            <div>Set data:</div>
            <input id="workerPrivateKey" placeholder="Enter your private key ... " className="bg-neutral-200 w-full"></input>
            <input id="workerFileKey" placeholder="Enter your skyfile hash ... " className="bg-neutral-200 w-full"></input>
            <button className="w-full text-left" onClick={() => { setJSONExample();}}>[ Publish skylink to registry ]</button>
            <input id="workerPublicKey" className="w-full bg-neutral-200" placeholder="Enter your public key ... "></input>
            <button className="w-full text-left" onClick={() => { setJSONExample();}}>[ Publish public key to contract ]</button>
        </div>
        <div id="box-3" className="bg-neutral-100 h-3/5 w-1/4">
            <div>Get data:</div>
            <input id="workerPublicKey" className="w-full bg-neutral-200" placeholder="Enter their public key ... "></input>
            <button className="w-full text-left" onClick={() => { getJSONExample();}}>[ Get skylink from registry ]</button>
            <input id="ret-skylink" disabled={true} placeholder="[ ... ]" className="bg-neutral-200 w-full"></input>
            <input id="workerPublicKey" className="w-full bg-neutral-200" placeholder="Enter your public key ... "></input>
            <button className="w-full text-left" onClick={() => { setJSONExample();}}>[ Publish public key to contract ]</button>
        </div>
        </div>
      </div>
      <div id="footer" className="absolute bottom-0 w-full bg-neutral-100">
        <div id="footer-content" className="flex flex-row items-center space-x-8 place-content-center py-2">
          <a href="https://github.com/figurestudios/sidehustles" target="_blank" className="text-black text-center underline text-lg">GitHub</a>
          <a href="https://skynetlabs.com/" target="_blank" className="text-black text-center underline text-lg">Skynet</a>
          <a href="https://polygon.technology/" target="_blank" className="text-black text-center underline text-lg">Polygon</a>
        </div>
      </div>
    </div>
  )
}

export default App;