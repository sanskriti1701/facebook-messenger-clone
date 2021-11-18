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
      <img className="image" src="https://scontent.fbho2-1.fna.fbcdn.net/v/t1.6435-9/121144316_4235843479868633_1561909311908486242_n.png?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=DJn7f9y0xvEAX8qgceJ&_nc_ht=scontent.fbho2-1.fna&oh=750880fe05c9d8990b1d5580b75db841&oe=61BCAA42" />
      <h1>Facebook Messenger</h1>
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
