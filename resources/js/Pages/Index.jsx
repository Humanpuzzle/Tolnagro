import { Link, Head } from '@inertiajs/react';
import 'sweetalert2/src/sweetalert2.scss'

import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import PollingComponent from '../Components/PollingData';

export default function Home({ auth }) {

    // modal
        let [isOpen, setIsOpen] = useState(false)
        function closeModal() { setIsOpen(false) }  
        function openModal() { setIsOpen(true) }
        const dialogRef = useRef(null);

    // form submit - emails.store
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const [responseMessage, setResponseMessage] = useState('');
        const [formData, setFormData] = useState({
            subject: '',
            content: '',
        });

        // Handle input change
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        // Handle saving an e-mail
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('/emails', formData);
                setResponseMessage(response.data.message);
                clearformData()
            } catch (error) {
                if (error.response) {
                    setResponseMessage(`Error: ${error.response.data.message}`);
                } else {
                    setResponseMessage('Error: Something went wrong.');
                }
            }
        };

        const clearformData = () => {
            setFormData({ subject: '', content: '' }); // Reset the state to an empty string
        };


    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-100 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6">
                        <header className="grid grid-cols-1 items-center gap-2 py-5 border-b-2">
                            <div className="flex justify-center">
                                <h1 className='text-xl font-semibold'>Tolnagro</h1>
                            </div>

                        </header>

                        <main className="mt-6">
                            <div className="flex justify-end mt-6 mb-6">
                                <button className='bg-teal-500 text-white rounded-md px-5 py-2 border border-black' onClick={openModal}>Új e-mail</button>
                            </div>
                            <ul role="list" className="divide-y divide-gray-100">
                                <li key='head' className="flex gap-x-6 py-3 border-b-2 border-t-2">
                                        <div className='flex gap-x-6'>                                            
                                            <p className="text-sm font-semibold leading-6 text-gray-400">Kiküldve</p>
                                        </div>
                                        <div className="flex-auto min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-400">E-mail tárgya és tartalma</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 flex-col items-end">
                                            <p className="text-sm font-semibold leading-6 text-gray-400">Törlés</p>   
                                        </div>
                                </li>                                
                                <PollingComponent />
                            </ul>
                        </main>

                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal} initialFocus={dialogRef ? dialogRef : undefined}>
                                <div style={{ display: "none" }} ref={dialogRef} />
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all sm:h-fit sm:w-full sm:max-w-[480px]">
                                            <div className='flex items-center gap-x-3 border-b-2 pb-3 mb-6'>
                                                <h2 className='bold text-xl'>Új e-mail</h2>
                                                <button className="ml-auto mt-1  rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeModal}>Bezárom</button>
                                            </div>
                                            <form onSubmit={handleSubmit}>

                                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Tárgy
                                                        </label>
                                                        <div className="mt-2">
                                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                            <input
                                                                id="subject"
                                                                type="text"
                                                                name="subject"
                                                                placeholder=""
                                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                value={formData.subject}
                                                                onChange={handleInputChange}
                                                                required                                                            
                                                            />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Tartalom
                                                        </label>
                                                        <div className="mt-2">
                                                            <textarea
                                                            id="content"
                                                            name="content"
                                                            rows={3}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            value={formData.content}
                                                            onChange={handleInputChange}
                                                            required                                                        
                                                            />
                                                        </div>
                                                    </div>                                                
                                                </div>
                                                <button type="submit"
                                                    className='ml-auto mt-6  rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2'
                                                    >
                                                    Küldés
                                                    </button>
                                            </form>
                                            {responseMessage && <p className='mt-6 text-green-500'>{responseMessage}</p>}

                                        </Dialog.Panel>
                                    </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>                          

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel + React + Vite + Tailwind
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
