import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `modal_visible modal modal_${props.modalName}` : `modal modal_${props.modalName}`}>
      <div className="modal__container modal__tooltip-container">
        <button type="reset" className="modal__reset-btn" onClick={props.onClose} />
        <img className="modal__tooltip-image" alt="декоративное изображение" src={props.src} />
        <p className="modal__tooltip-caption">
          {props.caption}
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;