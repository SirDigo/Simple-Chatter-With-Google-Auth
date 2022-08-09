import { useState } from "react";
import styled from "styled-components";

const StyledChat = styled.div`
    display: grid;
    text-align: center;
    justify-content: center;
    ul {
        list-style-type: none;
    }
    li {
        border: 1px solid black;
        width: 400px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
`

export default function Chat() {
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      userName: "Chris Man",
      message: "Such a bad site smh, mid",
      key: 112344223,
    },
    {
      userName: "Jhon Deo",
      message: "You come at me?",
      key: 1123442323,
    },
    {
      userName: "Big Tuna",
      message: "Bears, Beets, Battlestar Galactica",
      key: 112344111323,
    },
  ]);
  const loggedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  function handleMessageList(log) {
    return (
      <li key={log.key}>
        <p>{log.userName}</p>
        <h3>{log.message}</h3>
      </li>
    );
  }

  function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(user)
    const userMessage = {
      key: loggedUser.email,
      userName: `${cap(loggedUser.given_name)} ${cap(loggedUser.family_name)}`,
      message: chatMessage,
    };
    setChatLog([...chatLog, userMessage]);
    setChatMessage('')
  }

  return (
    <StyledChat>
      <ul>{chatLog.map((log) => handleMessageList(log))}</ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="chat-form">
          <input
            type="text"
            name="chat-form"
            placeholder="Your Message Here"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
        </label>
        <button type="Submit">Send It!</button>
      </form>
    </StyledChat>
  );
}