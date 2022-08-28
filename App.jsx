import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/bg"
import Web3 from "web3";
import {create } from "ipfs-http-client"



// Component
function App() {
  console.log(process.env.REACT_APP_NOT_SECRET_CODE);

  const [count, setCount] = useState(0);
  const [Counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);
  const [auth, setauth] = useState([]);

  const [myWallet, setMyWallet] = useState("");
  const [myBalance, setMyBalance] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const myWeb3 = await new Web3(window.ethereum)
      console.log(myWeb3);
      await window.ethereum.enable()
      .then(async wallet => {
        console.log(wallet);
        setMyWallet(wallet[0])

        setMyBalance(await myWeb3.eth.getBalance(wallet[0]))
        console.log(await myWeb3.eth.getAccounts());
        console.log(await myWeb3.eth.getTransaction("0x5dba8380c441c2cb6d32ab8866fcc351dd756e0b01e9689e7c1c240f3dffa3ce"));
        console.log(await myWeb3.eth.getTransactionReceipt("0x5dba8380c441c2cb6d32ab8866fcc351dd756e0b01e9689e7c1c240f3dffa3ce"));
      })

    } else {
      alert("Install Metamask")
    }
  }

  async function getUsers(data) {
    await axios.get(`https://jsonplaceholder.typicode.com/photos?auth${auth}`)
      .then(res => {
        console.log(res.data);
        setUsers(res.data.slice(0, 10))
      })
      .catch(err => {
        console.log(err);
      })

    console.log("----------------------");
  }


  useEffect(() => {
    if (!auth) {
      getUsers()

    } else {
      getUsers(auth)

    }

  }, [count, Counter, auth])



  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <p> {myWallet == "" ? "Wallet Not Connected" : `${myWallet}`} </p>
          <p> {myWallet == "" ? "" : `${myBalance} => ${(parseFloat(myBalance) / 1000000000000000000).toFixed(2)} RBA`} </p>
        </div>
        <div>
          <button onClick={connectWallet}>Connect to Metamask</button>
        </div>
      </div>

      <div className="bg" style={{ padding: "50px" }}>
        {
          users.map((user, i) => {
            return (
              <div className="card" key={i}>
                <div className="cardImg">
                  <img src={user.url} alt="img" />
                </div>
                <div className="info">
                  <div className="albumId" style={{ backgroundColor: parseFloat(user.albumId) == 1 ? "black" : "yellow" }}>  AlbumId: {user.albumId} </div>
                  <div className="id">       Id:      {user.id} </div>
                  <div className="title">    Title:   {user.title} </div>
                </div>
              </div>
            )
          })
        }

        <button onClick={() => setCount(count + 1)}> USE EFFECT  setCount {count}</button>
        <button onClick={() => setCounter(Counter + 1)}> USE EFFECT setCounter {Counter} </button>

        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;