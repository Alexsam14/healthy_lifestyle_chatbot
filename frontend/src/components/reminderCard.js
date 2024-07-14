import React from 'react';
// import  "./remindercard.css";
import "bootstrap/dist/css/bootstrap.css" 


export const ReminderCard = ({data, onDelete}) => {
    console.log(data, "data");
    return <div className='reminder-card m-2 ' style = {{borderRadius: "5px"}}>
        <p className='drug-name'>{data.drug}</p>
        <p>Due in {data.duration} hours</p>
        <div className='modification'>
            <button className='btn btn-lg btn-info m-2'>Update</button>
            <button onClick={onDelete} className='btn btn-lg btn-info m-2'>Delete</button>
        </div>
    </div>
}