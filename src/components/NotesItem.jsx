import React from 'react'
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Notes from './Notes';
import { baseURL } from '../utils/constant';
import './NotesItem.css'

const NotesItem = ({text,priority,status,dueDate,id, setUpdateUI,setShowPopup,setPopupContent})=> {
    const deleteNotes=()=>{
        axios.delete(`${baseURL}/delete/${id}`).then(res =>{
            console.log(res.data);
            setUpdateUI((prevState)=>!prevState)
        })
    }
    const updateNotes =()=>{
        setPopupContent({text,priority,status,dueDate,id});
        setShowPopup(true);
    }
    const markOncomplete = () => {
        const updatedStatus = status === "in progress" ? "compeleted" : "in progress"; // Toggle status
    
        axios
          .put(`${baseURL}/update/${id}`, { status: updatedStatus })
          .then((res) => {
            console.log(res.data);
            setUpdateUI((prev) => !prev); // Trigger UI update
          })
          .catch((err) => console.log(err));
      };
    
      const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = String(dateObj.getFullYear()).slice(-2); // Get last two digits of the year
        return `${day}-${month}-${year}`;
    };

  return (
    <>
      {/* <div className='notes text-center' style={notesContainerStyle}>
                <div className='text-center' style={noteStyle}>
                    <div style={innerContainerStyle}>
                        <div style={textStyle}>{text}</div>
                        <CiEdit className='icon' style={iconStyle} onClick={updateNotes} />
                        <MdDelete className='icon' style={iconStyle} onClick={deleteNotes} />
                    </div>
                </div>
            </div> */}
            <div className='notes text-center'>
                <div className='note-content'>
                    {text && <div>{text}</div>}
                    {dueDate && <div>{formatDate(dueDate)}</div>}
                    </div>
                <div className='icons'>
                    <CiEdit className='icon edit-button' onClick={updateNotes}/>
                    <MdDelete className='icon delete-button' onClick={deleteNotes}/>
                    <button onClick={markOncomplete} className="beautiful-buttonl mark-button">
                        {status === 'in progress' ? 'completed' : 'in progress'}
                    
                    </button>
                    {priority && <div>Priority : {priority}</div>}
                </div>
                </div> 
    </>
  );
};
const notesContainerStyle = {
    display: 'flex',
    color: 'black',
    alignItems: 'center',
    gap: '20px',
};

const noteStyle = {
    display: 'flex',
    color: 'black',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#d1c4e9', // Light purple background
    margin: '5px',
    borderRadius: '15px',
    padding: '10px 15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const innerContainerStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
};

const textStyle = {
    color: '#512da8', // Darker purple text
    fontSize: '16px',
    fontWeight: 'bold',
};

const iconStyle = {
    cursor: 'pointer',
    color: '#1e88e5', // Blue for icons
    fontSize: '20px',
};

export default NotesItem
