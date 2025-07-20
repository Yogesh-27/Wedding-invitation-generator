import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import CardPreview from './CardPreview';
import ReactDOM from 'react-dom/client';

const BulkGenerator = ({ guestList, formData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const generateCards = async () => {
    if (guestList.length === 0) {
      setMessage('❌ Please upload guest names first.');
      return;
    }

    setIsGenerating(true);
    setMessage('Generating cards...');
    setProgress(0);

    const zip = new JSZip();
    const tempContainer = document.createElement('div');
    document.body.appendChild(tempContainer);

    for (let i = 0; i < guestList.length; i++) {
      const guestName = guestList[i];

      const wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      tempContainer.appendChild(wrapper);

      const root = ReactDOM.createRoot(wrapper);
      root.render(<CardPreview data={formData} guestName={guestName} />);

      await new Promise((r) => setTimeout(r, 100)); // Wait for DOM render

      try {
        const png = await toPng(wrapper.firstChild);
        zip.file(`invitation_${guestName.replace(/\s+/g, '_')}.png`, png.split(',')[1], { base64: true });
      } catch (err) {
        console.error(`❌ Error capturing ${guestName}:`, err);
      }

      root.unmount();
      tempContainer.removeChild(wrapper);
      setProgress(Math.round(((i + 1) / guestList.length) * 100));
    }

    document.body.removeChild(tempContainer);
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'wedding_invitations.zip');
    setIsGenerating(false);
    setMessage('✅ All cards downloaded as ZIP!');
  };

  return (
    <div className="bulk-generator" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2> Bulk Invitation Generator</h2>

      {isGenerating ? (
        <div style={{ margin: '1rem 0', color: '#b03060' }}>
          <p>⏳ Please wait... ({progress}%)</p>
          <progress value={progress} max="100" style={{ width: '100%' }}></progress>
        </div>
      ) : (
        <button
          onClick={generateCards}
          style={{
            backgroundColor: '#b03060',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          📥 Download All Invitations ({guestList.length})
        </button>
      )}

      {message && <p style={{ marginTop: '1rem', color: '#333' }}>{message}</p>}
    </div>
  );
};

export default BulkGenerator;
