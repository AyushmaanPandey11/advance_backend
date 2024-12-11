import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log(`connected`);
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log(`message recieved `, message.data);
      setLatestMessage(message.data);
    };
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return;
    <>Loading...</>;
  }
  return (
    <>
      <input onChange={(e) => setMessage(e.target.value)}></input>
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        Send
      </button>
      {latestMessage}
    </>
  );
}

export default App;
