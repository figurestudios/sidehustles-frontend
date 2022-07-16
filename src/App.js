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
    EditorState.createEmpty(),
    console.log("updated") //runs twice
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  async function savePage() {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

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
        className="bg-white border-4 border-neutral-400 h-[30em] overflow-y-scroll cursor-text"
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
      <div className='pt-4'>
        <button className="px-5" onClick={savePage}>[save to Skynet]</button>
        <button className="px-5" onClick={loadPage}>[load from Skynet]</button>
      </div>
    </div>
  );
}

function TextBox() {
  var page = true

  const changePage = () => {
    if (page ? page = false : page = true);
    console.log(page);
  }

  return(
    <div className='bg-neutral-300 h-screen'>
      <div id="header" className="bg-neutral-500 relative top-0 w-full text-5xl h-16 text-neutral-200 border-neutral-400 border-b-4">
        <p className="inline-block align-middle text-center w-full">SIDEHUSTLES</p>
        <button className='fixed right-3 top-16 text-neutral-400' onClick={changePage}>X</button>
      </div>
      <div className='flex justify-center pt-4'>
        <div className='w-5/6 h-4/6'>
          <MyEditor/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

function JobOffering() {
  return(
    <div>
      <div className='flex flex-row h-16 w-full border-b-4 border-neutral-400'>
        <div className='w-1/3'>
          <p className='text-2xl h-2/5 overflow-hidden'>Job Title</p>
          <p className='text-xs h-3/5 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-300'>Job Description</p>
        </div>
        <div className='w-1/3 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-300'>
          <p>Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags, Tags, tags, tags</p>
        </div>
        <div className='flex flex-row w-1/3'>
          <div className='w-1/3 overflow-hidden'>
            <p className='pr-8 text-xl flex items-center justify-center h-full'>$5,00</p>
          </div>
          <div className='w-1/3 overflow-hidden'>
            <p className='pr-8 text-xl flex items-center justify-center h-full'>START</p>
          </div>
          <div className='w-1/3 overflow-hidden'>
            <p className='pr-8 text-xl flex items-center justify-center h-full'>CONTACT</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MainPage() {
  return(
    <div className='bg-slate-200 h-screen'>
      <div id="header" className="bg-neutral-300 relative top-0 w-full text-5xl h-16 border-neutral-400 border-b-4">
        <p className="inline-block align-middle text-center w-full">SIDEHUSTLES</p>
      </div>
      <div className="w-full h-5/6 px-[8%] pt-8 overflow-hidden">
        <div className='w-full h-full overflow-y-scroll border-neutral-400 scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-300'>
          <div className='bg-neutral-300 p-2'>
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
            <JobOffering />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default function App(){
  return(
    <div>
      <MainPage />
    </div>
  );
}