import React from 'react';


export const ReminderCard = ({drug, duration}) => {
    return <div className='reminder-card'>
        <p className='drug-name'>{drug}</p>
        <p>Due in {duration} hours</p>
        <div className='modification'>
            <button>Update</button>
            <button>Delete</button>
        </div>
    </div>
}