// App.jsx
import './App.css';
import Header from './components/Header';
import WeddingForm from './components/WeddingForm';
import CardPreview from './components/CardPreview';
import GuestListUploader from './components/GuestListUploader';
import BulkGenerator from './components/BulkGenerator';
import { useState } from 'react';

function App() {
  const [weddingData, setWeddingData] = useState({
    bride: '',
    groom: '',
    date: '',
    time: '',
    venue: '',
    message: '',
    template: 'elegant-rose',
  });

  const [guestList, setGuestList] = useState([]);

  return (
    <div className="app">
      <Header />

      <div className="form-preview-wrapper">
        <div className="left-panel">
          <WeddingForm onFormDataChange={setWeddingData} />
        </div>
        <div className="right-panel">
          <CardPreview data={weddingData} guestName="Mr. & Mrs. Sharma" />
        </div>
      </div>

      <div className='Guest-Container'>
        <div className="first">
          <GuestListUploader onGuestListUpdate={setGuestList} guestCount={guestList.length} />
        </div>
        <div className="second">
          <BulkGenerator guestList={guestList} formData={weddingData} />
        </div>
      </div>
    </div>
  );
}

export default App;
