import React from 'react';

export default function ViewApps(props) {
    const { currUser, viewAppsHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {viewAppsHeader}
            <AppList currUser={currUser} />
        </div>
    );
}

function AppList(props) {
    const { currUser } = props;
    const today = new Date();

    const upcomingApps = currUser.appointments.filter((app) => {
        return today <= app.date;
    });
    const upcomingAppsArray = upcomingApps.map((app, index) => {
        return <Appointment app={app.name} dateObject={app.date} key={index} />;
    });

    const pastApps = currUser.appointments.filter((app) => {
        return today > app.date;
    });
    const pastAppsArray = pastApps.map((app, index) => {
        return <Appointment app={app.name} dateObject={app.date} key={index} />;
    });

    return (
        <div className="animate-popup">
            <h2 className="font-heading text-2xl">Upcoming Appointments</h2>
            {!upcomingAppsArray.every(app => app === undefined) ? (
                <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px] grid grid-cols-[220px,350px] font-heading text-xl mt-2 ml-5">
                    <h3>Date</h3>
                    <h3>Appointment</h3>
                </div>
            ) : null}
            <div className="flex flex-col">
                {!upcomingAppsArray.every(app => app === undefined) ? upcomingAppsArray : <p className="my-4">No upcoming appointments.</p>}
            </div>
            <h2 className="font-heading text-2xl">Past Appointments</h2>
            {!pastAppsArray.every(app => app === undefined) ? (
                <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px] grid grid-cols-[220px,350px] font-heading text-xl mt-2 ml-5">
                    <h3>Date</h3>
                    <h3>Appointment</h3>
                </div>
            ) : null}
            <div className="flex flex-col">
                {!pastAppsArray.every(app => app === undefined) ? pastAppsArray : <p className="my-4">No past appointments.</p>}
            </div>
        </div>
    );
}

function Appointment(props) {
    const { app, dateObject } = props;
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();
    const year = dateObject.getFullYear();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    const date = month + '/' + day + '/' + year;

    return (
        <div className="sm:grid-cols-[150px,250px] md:grid-cols-[150px,300px] grid grid-cols-[220px,350px] font-heading text-xl w-[95%] p-[20px] bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[15px] mt-4">
            <p className="">{date}</p>
            <p className="">{app}</p>
        </div>
    );
}

// function FilterOApp(props) {
//     const {  } = props;
//     const handleOptionChange = (event) => {
//         currStatusCallback(event.target.value);
//     };

//     const handleTextChange = (event) => {
//         currInfoCallback(event.target.value.toLowerCase());
//     };
//     return (
//         <div>
//             <form className="animate-popup flex gap-3 mt-5 mb-10">
//                 <label className="absolute left-[-100vw]">Type something here...</label>
//                 <input className="p-[12px] w-[250px] rounded-[15px] bg-grey placeholder:text-black"
//                     onChange={handleTextChange} placeholder={'Search for ' + infoType + '...'} aria-label="Filter your health information" autoComplete="off" />
//                 <select className="p-[12px] w-[200px] rounded-[15px] bg-grey" onChange={handleOptionChange} value={currStatus}>
//                     <option value="">Filter by status...</option>
//                     {statuses}
//                 </select>
//             </form>
//         </div>
//     )
// }