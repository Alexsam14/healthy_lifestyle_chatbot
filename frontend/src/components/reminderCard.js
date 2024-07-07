import React from 'react';


export const ReminderCard = ({data, onDelete}) => {
    console.log(data, "data");
    return <div className='reminder-card'>
        <p className='drug-name'>{data.drug}</p>
        <p>Due in {data.duration} hours</p>
        <div className='modification'>
            <button>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    </div>
}