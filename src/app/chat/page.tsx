"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import SQLTable from '@/components/table/SQLTable';

const Chat = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [output, setOutput] = useState<any>(); 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userinput: userInput })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setOutput(responseData.result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        console.log("Output changed:", output);
    }, [output]);

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                {output ? <SQLTable responseData={output}/> : <p className="text-red-500">Couldn&apos;t find anything</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <input
                        className="flex-1 appearance-none border border-gray-300 py-2 px-4 rounded-md mr-2 focus:outline-none focus:border-blue-500"
                        id="userinput"
                        type="text"
                        placeholder="Type your SQL query here..."
                        value={userInput}
                        onChange={handleChange}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
