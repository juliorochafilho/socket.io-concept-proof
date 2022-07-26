import Head from "next/head";
import Image from "next/image";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  let socket;
  const inputRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [msg, setMsg] = useState("");

  const SocketInitializer = async () => {
    socket = await io.connect(process.env.BASE_URL, {
      path: "/api",
    });
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket);
      setConnected(true);
    });
    socket.on("message", (message) => {
      console.log(message);
      setConnected(true);
    });
  };

  useEffect(async () => {
    SocketInitializer();
  }, []);

  return (
    <div>
      {chat.map((message) => (
        <p>
          {message.user} | {message.msg}
        </p>
      ))}
      {typing.map((user) => (
        <p>{user} is Typing</p>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={msg}
        placeholder={connected ? "Type a message..." : "Connecting..."}
        disabled={!connected}
        onChange={(event) => {
          setMsg(event.target.value);
        }}
        // onKeyPress={(e) => {
        //   if (e.key === "Enter") {
        //     sendMessage();
        //   }
        // }}
      />
    </div>
  );
}
