"use client"

import React, { useState } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

function Connect() {
    const [accountAddr, setAccountAddr] = useState(null);

    const handleClick = async () => {
        // Check if MetaMask is installed
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                // Request permission to access accounts
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccountAddr(accounts[0]);
                console.log('Connected Account:', accounts[0]);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.log('MetaMask is not installed');
        }
    };

    const handleDelegateSign = async () => {
        try {
            const apiUrl = 'http://localhost:8000/api/sign';
            const add = "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c";
            const nonce = 10;
            const expiry = Math.floor(Date.now() / 1000);
            const verifyingContract = "0x9B7df4E58e7e07842d07c95bDFD2eC3857d3B05d"
            // Define your typed data
            const typedData = JSON.stringify({
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    Delegation: [
                        { name: 'delegatee', type: 'address' },
                        { name: 'nonce', type: 'uint256' },
                        { name: 'expiry', type: 'uint256' },
                    ],
                },
                primaryType: 'Delegation',
                domain: {
                    name: 'BARAC',
                    version: '1',
                    chainId: 97,
                    verifyingContract: verifyingContract,
                },
                message: {
                    delegatee: "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c",
                    nonce: nonce,
                    expiry: expiry,
                },
            });
            const web3 = new Web3(window.ethereum);
            const params = [add, (typedData)];
            const method = 'eth_signTypedData_v4';

            const signature = await web3.currentProvider.request(
                {
                    method,
                    params,
                    from: "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c",
                })

            const { r, s, v } = ethers.utils.splitSignature(signature);

            console.log('r:', r);
            console.log('s:', s);
            console.log('v:', v);
            console.log('nonce:', nonce);
            console.log('expiry:', expiry);

            // Prepare the request body
            const requestBody = JSON.stringify({
                delegatee: "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c",
                nonce: nonce,
                expiry: expiry,
                v: v,
                r: r,
                s: s,
            });
            console.log(requestBody);
            // HTTP request
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error('API Network response was not ok');
            }

            const data = await response.json();
            console.log("API Response:", data);
        } catch (error) {
            console.error('Error signing message:', error);
        }
    };

    const handleCastByVote = async () => {
        try {
            // Constants
            const apiUrl = 'http://localhost:8000/api/castbyvote';
            const add = "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c";
            const proposalId = 10;
            const voteFor = true;
            const verifyingContract = "0x93f8dddd876c7dBE3323723500e83E202A7C96CC"

            const typedData = JSON.stringify({
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    BallotJudgment: [
                        { name: 'proposalId', type: 'uint256' },
                        { name: 'voteFor', type: 'bool' },
                    ],
                },
                primaryType: 'BallotVote',
                domain: {
                    name: 'Scarab Dao',
                    chainId: 1,
                    verifyingContract: verifyingContract,
                },
                message: {
                    proposalId: proposalId,
                    voteFor: voteFor,
                },
            });

            // Web3 setup
            const web3 = new Web3(window.ethereum);
            const params = [add, typedData];
            const method = 'eth_signTypedData_v4';

            // Sign the message
            const signature = await web3.currentProvider.request({
                method,
                params,
                from: add,
            });

            // Split the signature
            const { r, s, v } = ethers.utils.splitSignature(signature);

            // Prepare the request body
            const requestBody = JSON.stringify({
                proposalAddress: add,
                proposalId: proposalId,
                voteFor: voteFor,
                v: v,
                r: r,
                s: s,
            });

            // HTTP request
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error('API Network response was not ok');
            }

            const data = await response.json();
            console.log("API Response:", data);
        } catch (error) {
            console.error('Error signing message or making API request:', error);
        }
    };

    const handleCastVoteJudgement = async () => {
        try {
            // Constants
            const apiUrl = 'http://localhost:8000/api/castbyjudgement';
            const add = "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c";
            const judgementId = 10;
            const favourJudgment = true;
            const verifyingContract = "0x93f8dddd876c7dBE3323723500e83E202A7C96CC"

            const typedData = JSON.stringify({
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    BallotJudgment: [
                        { name: 'judgementId', type: 'uint256' },
                        { name: 'favourJudgment', type: 'bool' },
                    ],
                },
                primaryType: 'BallotJudgment',
                domain: {
                    name: 'Scarab Dao',
                    chainId: 1,
                    verifyingContract: verifyingContract,
                },
                message: {
                    judgementId: judgementId,
                    favourJudgment: favourJudgment,
                },
            });

            // Web3 setup
            const web3 = new Web3(window.ethereum);
            const params = [add, typedData];
            const method = 'eth_signTypedData_v4';

            // Sign the message
            const signature = await web3.currentProvider.request({
                method,
                params,
                from: add,
            });

            // Split the signature
            const { r, s, v } = ethers.utils.splitSignature(signature);

            // Prepare the request body
            const requestBody = JSON.stringify({
                judgementAddress: add,
                judgementId: judgementId,
                favourJudgment: favourJudgment,
                v: v,
                r: r,
                s: s,
            });

            // HTTP request
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error('API Network response was not ok');
            }

            const data = await response.json();
            console.log("API Response:", data);
        } catch (error) {
            console.error('Error signing message or making API request:', error);
        }
    };
    return (
        <div>
            {accountAddr ? (
                <div>
                    <p>Connected Address: {accountAddr}</p> <br /><br />
                </div>
            ) : (
                <div>
                    <button onClick={handleClick}>Connect</button> <br /><br />
                </div>
            )}
            <button onClick={handleDelegateSign}> Delegate</button><br /><br />
            <button onClick={handleCastByVote}> CastVote </button><br /><br />
            <button onClick={handleCastVoteJudgement}> CastJudgement </button>
        </div>
    );
}

export default Connect;
