"use client"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
// components/EmailForm.js
import React, { useState } from 'react';


const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmail('');
        setMessage('Vielen Dank für Ihre Anmeldung!');
      } else {
        throw new Error('Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      setMessage('Es gab ein Problem mit Ihrer Anmeldung.');
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className="bg-cover bg-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mt-10 text-4xl text-black font-bold mb-6">Join the Newsletter</h2>
          <p className="text-black text-lg mb-6">Want to be the first to know when new tutorial is out? Sign up below.</p>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter an email address"
            className="px-4 py-3 w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded-l-md"
          />
          <Button type='submit' variant="signMe" size="inputlg">
            <PlusCircle className="h-4 w-4 mr-2" />
            Sign up
          </Button>          
      </form>
      </div>
    </div>
  </div>
  );
};

export default EmailForm;
