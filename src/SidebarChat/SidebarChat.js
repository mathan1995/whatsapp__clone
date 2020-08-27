import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Avatar, IconButton } from '@material-ui/core';
import db from '../Firebase/firebase';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CancelIcon from '@material-ui/icons/Cancel';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');
  const [open, setOpen] = React.useState(false);
  const [roomName, setRoomName] = React.useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true);
    if (roomName) {
      // Do some cleaver database stuff
      db.collection('rooms').add({
        name: roomName,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createChat = () => {
    // const roomName = prompt('Please enter name for chat room');
    setOpen(true);
    if (roomName) {
      // Do some cleaver database stuff
      db.collection('rooms').add({
        name: roomName,
      });
      handleClose();
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <AddIcon /> <h4>Add new chat</h4>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter You chat room "
            type="text"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <IconButton>
            <CancelIcon />
          </IconButton>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SidebarChat;
