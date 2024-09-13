import React, { useEffect, useState ,useRef } from "react";
import NotesItem from "./NotesItem";
import axios from "axios";
import { baseURL } from "../utils/constant";
import Popup from "./Popup";
import "./Home.css";
import "./NotesItem.css";
import "./Notes.css"
import PopupA from "./PopupA"
import { IoIosPrint } from "react-icons/io";  

const Notes = () => {
  const [note, setNote] = useState([]);
  const [input, setInput] = useState({
    notes: "",
    status: "in progress",
    dueDate:new Date().toISOString().split('T')[0],
    priority:"",

  });
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [dueDate, setdueDate] = useState('');
  const [priority, setpriority] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [showInputss, setShowInputss] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${baseURL}/notes`);
      setNote(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [updateUI]);
  


  const saveNotes = () => {
    axios
      .post(`${baseURL}/save`, input)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
  
        // Fix the missing curly brace and closing parentheses
        setInput({
          notes: "",
          priority: "",
          dueDate: new Date().toISOString().split('T')[0],
        });
  
        // Ensure all states are set correctly
        setShowInputs(false);
        setShowInputss(false);
        setShowInput(false);
      })
      .catch((err) => console.log(err));
  };
  

  const inputStyle = {
    backgroundColor: "#e0f7fa",
    border: "2px solid #0288d1",
    borderRadius: "20px",
    padding: "10px 15px",
    fontSize: "16px",
    color: "#0277bd",
    outline: "none",
    transition: "border-color 0.3s ease",
    marginRight: "10px",
  };

 
  const renderNotes= () => {
    return note
      
      .map((el) => (
        <NotesItem
          key={el._id}
          text={el.notes}
          priority={el.priority}
          status={el.status}
          dueDate={el.dueDate}
          id={el._id}
          setUpdateUI={setUpdateUI}
          setShowPopup={setShowPopup}
          setPopupContent={setPopupContent}
          popupContent={popupContent}
        />
      ));
  };

  const sortNotesByPriority = () => {
    const sortedNotes = [...note].sort((a, b) => Number(a.priority) - Number(b.priority)); // Convert priorities to numbers for correct sorting
    setNote(sortedNotes); // Update state with sorted notes
    setIsSorted(true); // Toggle sorted state
  };

  const sortNotesByDueDate = () => {
    const sortedNotes = [...note].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setNote(sortedNotes);
  };
  
  const updatePopupContent = (text,  dueDate) => {
    setPopupContent({ text, priority,status,id, date });
    setShowPopup(true);
  };
  const handleAddEmployee = () => {
    setShowInputss(true);
  };
  return (
    <>
      <div className="background"></div>
      <div
        className="container"
        style={{
          color: "#87CEEB",
          fontWeight: "bold",
          margin: "5px 2px",
          marginTop: "5px",
          padding:"3px",
          alignItems: "center",
        }}
      >
        <h1 className="title text-center">Notes</h1>
        <div className="button-container">
        <button onClick={handleAddEmployee}className="add-employee-button">Add Notes</button>
        <button onClick={sortNotesByPriority} className="add-employee-button">Sort by Priority</button>
        <button onClick={sortNotesByDueDate} className="add-employee-button">Sort by Due Date</button> 
        </div>
        {showInputss && (
        <PopupA
        input={input}
        setInput={setInput}
        saveNotes={saveNotes}
        setShowInputss={setShowInputss}
      />
        )}
        {/* <div className="input_holder text-center">
          <input
            value={input.notes}
            onChange={(e) => setInput({ ...input, notes: e.target.value })}
            style={inputStyle}
            type="text"
            placeholder="Add a note"
            onFocus={(e) => (e.target.style.borderColor = "#01579b")}
            onBlur={(e) => (e.target.style.borderColor = "#0288d1")}
          /> */}
         
          
          {/* <button onClick={saveNotes} className="beautiful-button">
            Add
          </button> */}
        {/* </div> */}
        {/* <div className='list'>
            <h1 className='title text-center'>HR</h1>
            <h1 className='title text-center'>Safety</h1>
            <h1 className='title text-center'>Worker</h1>
                  {note.map(el =><NotesItem key={el._id} text={el.notes} post={el.posts} id={el._id} setUpdateUI={setUpdateUI} setShowPopup={setShowPopup} setPopupContent={setPopupContent} popupContent={popupContent} />)}
            </div> */}
        {/* <div className="dropdown">
                  <button className="dropbtn">Dropdown</button>
                  <div className="dropdown-content">
                  {note.map(el =><NotesItem key={el._id} text={el.notes} post={el.posts} id={el._id} setUpdateUI={setUpdateUI} setShowPopup={setShowPopup} setPopupContent={setPopupContent} popupContent={popupContent} />)}
                  </div>
                </div> */}

        <div className="list" style={{lineHeight:'20px'}}>
       {renderNotes()}
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />

      )}
      </div>
    </>
  );
};
export default Notes;
