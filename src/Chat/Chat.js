import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomname, setRoomName] = useState('');
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('You type>>>>>' + input);
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
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className="chat__name">Mathan Jeya</span>
          hey guys
          <span className="chat__timestamp">12:55 PM</span>
        </p>
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
