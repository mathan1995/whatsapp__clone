import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticonOutlined,
} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import db from '../Firebase/firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
function Chat() {
  const [{ user }] = useStateValue();
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomname, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('You type>>>>>' + input);
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div className="chat">
      {/* Chat header */}

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h2>{roomname}</h2>
          <p>last seen at..</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Chat body */}

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && 'chat__receiver'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      {/* Chat footer */}

      <div className="chat__footer">
        <InsertEmoticonOutlined />
        <form>
          <input
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
