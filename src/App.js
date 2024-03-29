// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {  FormControl, InputLabel, Input } from '@mui/material';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    // run once app content loads
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))

      });
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessages([...messages, { username: username, message: input }
    ]);
    setInput('');
  }
  return (
    <div className="App">
      <img className="image" alt="logo" 
    src="https://freepngimg.com/download/chat/97434-logo-pic-chat-free-transparent-image-hq.png" />
      <h1>WhatsBook Community Messenger</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message..</InputLabel>
          <Input className="app__input" value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__formControl" disabled={!input} variant="contained" color="primary" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}
export default App;
