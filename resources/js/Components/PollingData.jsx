/* 
Polling method
Pros:
    -   Simple to implement.
    -   Works in any environment.
Cons:
    -   Not truly real-time.
    -   Can be inefficient and increase server load due to frequent requests

Better solution would be: WebSockets (Real-Time Approach but requires a WebSocket server)
*/
import React, { useState, useEffect } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";    
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

function PollingComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('data');
            setData(response.data);
            
            const date = new Date();
            console.log('E-mailes loaded: ' + date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds())
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data initially
    // Set up polling every 60 seconds (60000 milliseconds)
    // Clean up the interval on component unmount
    useEffect(() => {
        fetchData();    
        const intervalId = setInterval(fetchData, 60000);    
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle deleting an e-mail
    const deleteMail = async (id) => {
        try {
            await axios.delete(`/data/${id}`);
            setData(data.filter(mail => mail.id !== id)); // Remove the deleted emial from state
        } catch (err) {
            setError('Hiba törlés közben.');
        }
    };        

    const confirmDeletion = (index) => {    
        Swal.fire({
            title: 'Biztos vagy benne?',
            text: "Ezt nem tudod visszaállítani!",
            icon: 'warning',
            color: '#EBF1F5',
            background: '#1d2333',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#bd1d32',
            cancelButtonColor: '#1d2333',
            cancelButtonText: 'Mégsem',
            confirmButtonText: 'Igen, Törlöm!'
        }).then((result) => {
            if (result.isConfirmed) { // Trigger delete function
                deleteMail(index)
                if(!error) {
                    Swal.fire({
                        title: "Sikeres törlés!",
                        text: "Az Ön e-mailje törölve lett.",
                        icon: "success",
                        color: '#EBF1F5',
                        background: '#1d2333'                    
                    });
                } else {
                    Swal.fire({
                        title: "Hiba!",
                        text: error,
                        icon: "error",
                        color: '#EBF1F5',
                        background: '#1d2333'                    
                    });                    
                }
            };
        });
    
    }; 



    return (
        <div>
            {
            data.map((mail) => (
                <li key={mail.id} className="flex gap-x-6 py-3">
                    <div className='flex gap-x-6'>
                        <span className='rounded-md bg-green-300 w-16 h-12 text-center py-3'>{mail.sentout}</span>
                    </div>
                    <div className="flex-auto min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{mail.subject}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{mail.content}</p>
                        </div>
                    </div>
                    <div className="shrink-0 flex-col items-end">
                        <button 
                            className='text-red-400 text-xl' 
                            title='törlés' 
                            onClick={() => confirmDeletion(mail.id)}
                            >
                                <FaRegTrashCan />
                        </button>
                    </div>
                </li>
            ))                    
            }
        </div>
    );
}

export default PollingComponent;
        