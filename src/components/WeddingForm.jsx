import React, { useState } from 'react';
import './WeddingForm.css';

const templates = ["Elegant Rose", "Traditional Gold", "Modern Minimal", "Floral Garden"];

function WeddingForm({ onFormDataChange }) {
  const [formData, setFormData] = useState({
    bride: '',
    groom: '',
    date: '',
    time: '',
    venue: '',
    message: '',
    template: 'Elegant Rose',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onFormDataChange(updated);
  };

  return (
    <div className="wedding-form">
      <h2>💒 Wedding Details</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Bride's Name</label>
          <input type="text" name="bride" value={formData.bride} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Groom's Name</label>
          <input type="text" name="groom" value={formData.groom} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Venue</label>
        <input type="text" name="venue" value={formData.venue} onChange={handleChange} />
      </div>

      <div className="form-group full-width">
        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} />
      </div>

      <label>Choose Template</label>
      <div className="template-options">
        {templates.map((template) => (
          <div
            key={template}
            className={`template-box ${formData.template === template ? 'selected' : ''}`}
            onClick={() => handleChange({ target: { name: 'template', value: template } })}
          >
            {template}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeddingForm;
