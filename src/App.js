import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
//import React, { Component, useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
//import { EditorState } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Warning from "./Warning"
import Footer from './Footer';
import { convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { render } from '@testing-library/react';


/*const CoinbaseWallet = new WalletLinkConnector({
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
});*/

/*function App(){

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

  const editor = React.useRef(null);

  //const [editorState, setEditorState] = useState(true);

  function download() {
    console.log(Editor.innerHTML);
  }

  /*useEffect(() => {
    setEditorState((prevState) => prevState == true ? prevState = false : prevState = true);
  }, []);*/

/*  return (
    <div>
      {/*-
      <Warning />
      <div id="header" className="bg-neutral-100 relative top-0 w-full text-5xl h-16">
        <p className="inline-block align-middle text-center w-full">SIDEHUSTLES</p>
      </div>
      <div id="body">
        <Editor
          ref={editor}
          placeholder="Write something!"
        />
        <button onClick={download}>Test</button>
      </div>
      <Footer />
    </div>
  )
}

export default App;*/

const portal =
window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

const client = new SkynetClient(portal);

const { publicKey } = genKeyPairFromSeed("you should not be reading this super private secure seed phrase");
const { privateKey } = genKeyPairFromSeed("you should not be reading this super private secure seed phrase");

const dataKey = "sidehustles";

async function getJSONExample() {
  try {
    const { data, dataLink } = await client.db.getJSON(publicKey, dataKey);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function setJSONExample(_json) {
  try {
    await client.db.setJSON(privateKey, dataKey, _json);
  } catch (error) {
    console.log(error);
  }
}

function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  async function savePage() {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    /*const markup = draftToHtml(
      rawContentState
    );*/

    console.log(rawContentState)

    const json = { raw: rawContentState };

    await setJSONExample(json);

    alert("done");
  }

  async function loadPage() {
    const json = await getJSONExample();

    const contentState = convertFromRaw(json.raw);

    const editorState = EditorState.createWithContent(contentState);

    setEditorState(editorState);

    alert("done");
  }


  return (
    <div className="flex flex-col">
      <div
        style={{ border: "2px solid grey", height: "30em", overflow: 'scroll' ,boxSizing: 'border-box', cursor: "text" }}
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Placeholder text ..."
        />
      </div>
      <div>
        <button className="px-5" onClick={savePage}>[save to Skynet]</button>
        <button className="px-5" onClick={loadPage}>[load from Skynet]</button>
      </div>
    </div>
  );
}

export default function App(){

  var page = true

  const changePage = () => {
    if (page ? page = false : page = true);
    console.log(page);
  }
  
  if (page) {
    return(
      <div>
        <div id="header" className="bg-neutral-200 relative top-0 w-full text-5xl h-16 border-neutral-400 border-b-4">
          <p className="inline-block align-middle text-center w-full">SIDEHUSTLES</p>
          <button className='fixed right-3 top-16' onClick={changePage}>X</button>
        </div>
        <div className='flex justify-center pt-4'>
          <div className='w-5/6 h-4/6'>
            <MyEditor/>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return(
      <div>
        <div id="header" className="bg-neutral-200 relative top-0 w-full text-5xl h-16 border-neutral-400 border-b-4">
          <p className="inline-block align-middle text-center w-full">SIDEHUSTLES</p>
          <button className='fixed right-3 top-16' onClick={changePage}>X</button>
        </div>
      </div>
    );
  }
}