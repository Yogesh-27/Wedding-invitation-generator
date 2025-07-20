import React from 'react';
import './CardPreview.css';

function CardPreview({ data, guestName }) {
  const {
    bride = 'Bride Name',
    groom = 'Groom Name',
    date = 'Wedding Date',
    time = 'Wedding Time',
    venue = 'Wedding Venue',
    message = 'We request the pleasure of your company to celebrate the wedding',
    template = 'Elegant Rose',
  } = data;

  const templateClass = `wedding-card ${template.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="card-preview-wrapper">
      <div className={templateClass}>
        <div className="card-border-decor">
          <div className="wedding-header">💍 With Great Joy</div>
          <div className="invite-line">We invite you to the wedding of</div>

          <div className="wedding-names">
            <span className="name bride-name">{bride}</span>
            <span className="ampersand">&</span>
            <span className="name groom-name">{groom}</span>
          </div>

          <div className="event-details">
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Venue:</strong> {venue}</p>
          </div>

          {guestName && (
            <div className="event-details">
              <p><strong>To:</strong> {guestName}</p>
            </div>
          )}

          <div className="wedding-message">"{message}"</div>

          {/* <div className="footer-template">Theme: <strong>{template}</strong></div> */}
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
