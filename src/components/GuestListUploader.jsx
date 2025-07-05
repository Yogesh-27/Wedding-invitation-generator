import React, { useState } from 'react';
import './GuestListUploader.css';

const GuestListUploader = ({ onGuestListUpdate, guestCount }) => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [manualEntryVisible, setManualEntryVisible] = useState(false);
  const [manualText, setManualText] = useState('');

  const parseGuests = (text) => {
    return text
      .split(/\r?\n|,/)
      .map((line) => line.trim())
      .filter((name) => name.length > 0);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const guests = parseGuests(reader.result);
      if (guests.length > 0) {
        onGuestListUpdate(guests);
        setUploadMessage(`✅ Successfully loaded ${guests.length} guests from CSV.`);
      } else {
        setUploadMessage('❌ No valid guest names found in the file.');
      }
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleFileUpload(file);
    } else {
      setUploadMessage('❌ Please upload a valid CSV file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect({ target: { files: [file] } });
  };

  const handleManualSubmit = () => {
    const guests = parseGuests(manualText);
    if (guests.length > 0) {
      onGuestListUpdate(guests);
      setUploadMessage(`✅ Successfully added ${guests.length} guests from manual input.`);
    } else {
      setUploadMessage('❌ Please enter at least one guest name.');
    }
  };

  const downloadSample = () => {
    const sample = `John Smith\nJane Doe\nMr. & Mrs. Johnson\nThe Kumar Family\nDr. Sarah Wilson`;
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-guests.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="guest-upload-wrapper">
      <h2>👥 Guest List Upload</h2>

      <div
        className="upload-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="upload-text">
          Drop your CSV file here
          <br />
          <small>or click to browse</small>
        </p>
        <input
          type="file"
          accept=".csv"
          id="csv-upload"
          onChange={handleFileSelect}
          hidden
        />
        <label htmlFor="csv-upload" className="upload-button">
          📁 Choose CSV File
        </label>
      </div>

      <button
        className="toggle-manual-btn"
        onClick={() => setManualEntryVisible(!manualEntryVisible)}
      >
        {manualEntryVisible ? '🔽 Hide Manual Entry' : '✍️ Add Manually'}
      </button>

      {manualEntryVisible && (
        <div className="manual-entry">
          <textarea
            rows={5}
            placeholder="Enter guest names, one per line or comma separated..."
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
          />
          <button className="submit-btn" onClick={handleManualSubmit}>
            Submit Names
          </button>
        </div>
      )}

      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      {guestCount > 0 && (
        <p className="guest-count">🎉 {guestCount} guests ready for invitation!</p>
      )}

      <div className="sample-download">
        <p>Need a sample format?</p>
        <button onClick={downloadSample} className="sample-btn">
          📥 Download Sample CSV
        </button>
      </div>
    </div>
  );
};

export default GuestListUploader;
