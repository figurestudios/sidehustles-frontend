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

  const { publicKey } = genKeyPairFromSeed("this seed should be fairly long for security");
  const { privateKey } = genKeyPairFromSeed("this seed should be fairly long for security");

  const dataKey = "myApp";
  const json = { example: "Hello." };

  console.log("publicKey", publicKey);

  async function getJSONExample() {
    try {
      const { data, dataLink } = await client.db.getJSON(publicKey, dataKey);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function setJSONExample() {
    try {
      await client.db.setJSON(privateKey, dataKey, { example: getText() });
    } catch (error) {
      console.log(error);
    }
  }

  function getEntryExample() {
    try {
      const url = client.registry.getEntryUrl(publicKey, dataKey);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  }

  function getText() {
    return document.getElementById("text-field").value;
  }

  return (
    <div className='grid place-items-center h-screen'>
      <input id="file-field" placeholder="Your content ..." className="bg-slate-600 w-1/3 px-4 py-4"></input>
      <input id="desc-field" placeholder="Your description ..." className="bg-slate-600 w-1/3 px-4 py-4"></input>
      <input id="file-link" disabled="true" placeholder="Your skylink ... (content)" className="bg-slate-600 w-1/3 px-4 py-4"></input>
      <input id="desc-link" disabled="true" placeholder="Your skylink ... (description)" className="bg-slate-600 w-1/3 px-4 py-4"></input>
      <button onClick={getJSONExample}>Get JSON</button>
      <button onClick={setJSONExample}>Set JSON</button>
      <button onClick={getEntryExample}>Get URL</button>
      <button onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
      <button onClick={() => { activate(WalletConnect) }}>Wallet Connect</button>
      <button onClick={() => { activate(Injected) }}>Metamask</button>

      <button onClick={deactivate}>Disconnect</button>

      <div>{"Connection Status: "+active}</div>
      <div>{"Account: "+account}</div>
      <div>{"Network ID: "+chainId}</div>
    </div>
  )
}

export default App;

/*export default function App() {
  return (
    <div>
      <script>await getJSONExample();</script>
    <p className="text-slate-900">test</p>
    </div>
  )
}*/