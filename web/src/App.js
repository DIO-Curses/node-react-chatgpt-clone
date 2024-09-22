import './App.css';
import './styles/reset.css';
import { useState } from 'react';

import { makeRequest } from './api/api';
import SideMenu from './components/SideMenu/Sidemenu';
import ChatMessage from './components/ChatMessage/ChatMessage';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      user: 'gpt',
      message: 'Como posso te ajudar hoje?',
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await makeRequest({ prompt: input });
      const formattedResponse = formatResponse(response.data);

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { user: 'me', message: input },
        { user: 'gpt', message: formattedResponse },
      ]);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    } finally {
      setInput('');
    }
  };

  const formatResponse = (data) => {
    return data
      .split('\n')
      .map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <div className='App'>
      <SideMenu />

      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input
              rows='1'
              className='chat-input-textarea'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
