import React from "react";
import "./Popup.css"
import { RxCross1 } from "react-icons/rx";

const PopupA = ({ input, setInput, saveNotes, setShowInputss }) => {
  const handleClose = () => {
    setShowInputss(false);
  };

  return (
    <div className="backdrop">
      <div className="popup leave-popup">
      <RxCross1 className='cross' onClick={handleClose} />
      <h2 className='popup-title'>Add Notes</h2>
      <div className='popup__input_holder'>
          <input className='popup-input'
            value={input.notes}
            onChange={(e) => setInput({ ...input, notes: e.target.value })}
            type="text"
            placeholder="Add Note"
          />
          </div>
          <div className='popup__input_holder'>
          <select className='popup-input'
            value={input.priority}
            onChange={(e) => setInput({ ...input, priority: e.target.value })}
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        
          </select>
          </div>
          
        
          <div className="popup__input_holder">
          <input
            className="popup-input"
            type="date"
            name="dueDate"
            value={input.dueDate}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Select due date"
          />
        </div>
          <button onClick={saveNotes} className='beautiful-button'>Add</button>
         
       
      </div>
    </div>
  );
};

export default PopupA;