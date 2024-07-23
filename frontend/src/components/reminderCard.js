import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./reminderCard.css";

export const ReminderCard = ({ data, onDelete }) => {
    console.log(data, "data");
    return (
        <div className='reminder-card m-2'>
            <div className='content'>
                <p className='drug-name'>{data.drug}</p>
                <p className='drug-info'>Due every {data.duration} {data.durationUnit}</p>
                <div className='modification'>
                    <button onClick={onDelete} className='btn btn-lg'>Delete</button>
                </div>
            </div>
        </div>
    );
};
