import { useEffect, useRef, useState } from "react";
import "./App.css";
import { sendMessage } from "./openAi";

const userImg =
  "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";

const gptImage =
  "https://cdn.iconscout.com/icon/free/png-256/free-openai-1524262-1290809.png";

const messageIcon =
  "https://icones.pro/wp-content/uploads/2022/01/icone-de-commentaire-et-de-retroaction-jaune.png";

const chatImg =
  "https://static.vecteezy.com/system/resources/previews/021/608/790/non_2x/chatgpt-logo-chat-gpt-icon-on-black-background-free-vector.jpg";

const addButton = "https://cdn-icons-png.flaticon.com/512/10233/10233645.png";
function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hi Iam PersGPT, How may I assist you?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const txtMsg = input;
    if (txtMsg === "") {
      alert("Need some text for response!");
      return;
    }
    setInput("");
    const res = await sendMessage(txtMsg);
    setMessages([
      ...messages,
      {
        text: txtMsg,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const someQuery = async (e) => {
    const txtMsg = e.target.value;
    setInput("");
    const res = await sendMessage(txtMsg);
    setMessages([
      ...messages,
      {
        text: txtMsg,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
  };
  return (
    // const message = this.messages
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          {/* here we are going to render image of chatgpt and some buttons such as NEW CHAT, and some functionalities */}
          <div className="upperSideTop">
            <div className="first">
              <img src={chatImg} alt="" className="logo" />
              <span className="brand">PersGpt</span>
            </div>
            <div className="newchat">
              <button
                className="midBtn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <img src={addButton} alt="" className="addBtn" />
                New Chat
              </button>
            </div>
            <div className="upperSideBottom">
              <div className="newchat">
                <button
                  className="query"
                  value="What is Programming"
                  onClick={someQuery}
                >
                  <img src={messageIcon} alt="" className="addBtn" />
                  What is Programming?
                </button>
              </div>
              <div className="newchat" onClick={someQuery}>
                <button className="query">
                  <img src={messageIcon} alt="" className="addBtn" />
                  What is an API?
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lowerSide"></div> */}
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat user"}>
              <img
                src={message.isBot ? gptImage : userImg}
                className="imagechat"
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              className="input"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={handleEnter}
              placeholder="Send s Message"
            />
          </div>
          <div>
            <button className="send" onClick={handleSend}>
              ✅
            </button>
          </div>
        </div>
        <marquee className="message">
          Sometimes may produce inaccurate information about people, places, or
          facts.
        </marquee>
      </div>
    </div>
  );
}

export default App;
