import React from 'react';
import { Helmet } from 'react-helmet';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-gray-950 py-6 sm:py-12">
        <div className="container mx-auto px-6 md:px-12 xl:px-6">
          <div>
            <p className="text-sm leading-4 text-gray-600 dark:text-gray-400">Home</p>
          </div>
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-gray-100 mb-10 relative before:block before:absolute before:bg-sky-300 before:content-[''] relative before:w-20 before:h-1 before:-skew-y-3 before:-bottom-4">Drop Us a Line</h1>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 max-w-4xl mx-auto w-full rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 md:p-10 rounded-lg shadow-inner">
              <h2 className="mb-8 font-bold text-xl md:text-2xl text-gray-800 dark:text-gray-100 relative before:block before:absolute before:bg-sky-300 before:content-[''] relative before:w-20 before:h-1 before:-skew-y-3 before:-bottom-4">Contact Information</h2>
              <p className="font-bold text-gray-800 dark:text-gray-100 py-4 border-b border-gray-300 dark:border-gray-600">
                Location
                <span className="font-normal text-sm text-gray-600 dark:text-gray-400 block">Romada, 16/A, YoYo City, USA</span>
              </p>
              <p className="font-bold text-gray-800 dark:text-gray-100 py-4 border-b border-gray-300 dark:border-gray-600">
                Phone Number
                <span className="font-normal text-sm text-gray-600 dark:text-gray-400 block">+889 (909) 567 87 9</span>
              </p>
              <p className="font-bold text-gray-800 dark:text-gray-100 py-4 border-b border-gray-300 dark:border-gray-600">
                Email Address
                <span className="font-normal text-sm text-gray-600 dark:text-gray-400 block">example@example.com</span>
              </p>
              <p className="font-bold text-gray-800 dark:text-gray-100 py-4 border-b border-gray-300 dark:border-gray-600">
                Website
                <span className="font-normal text-sm text-gray-600 dark:text-gray-400 block">example.com</span>
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 md:p-14 rounded-lg shadow-inner">
              <h2 className="mb-8 font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-100 relative before:block before:absolute before:bg-sky-300 before:content-[''] relative before:w-20 before:h-1 before:-skew-y-3 before:-bottom-4">Get in Touch</h2>
              <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col">
                  <input className="py-3 bg-white dark:bg-gray-800 rounded-lg px-6 placeholder:text-xs border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-300 transition-colors" aria-placeholder="Your Name" placeholder="Your Name" />
                </div>
                <div className="flex flex-col">
                  <input className="py-3 bg-white dark:bg-gray-800 rounded-lg px-6 placeholder:text-xs border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-300 transition-colors" aria-placeholder="Your Surname" placeholder="Your Surname" />
                </div>
              </div>
              <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col">
                  <input className="py-3 bg-white dark:bg-gray-800 rounded-lg px-6 placeholder:text-xs border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-300 transition-colors" aria-placeholder="Email Address" placeholder="Email Address" />
                </div>
                <div className="flex flex-col">
                  <input className="py-3 bg-white dark:bg-gray-800 rounded-lg px-6 placeholder:text-xs border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-300 transition-colors" aria-placeholder="Subject" placeholder="Subject" />
                </div>
              </div>
              <div className="mb-6">
                <textarea className="w-full rounded-lg bg-white dark:bg-gray-800 placeholder:text-xs px-6 py-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-300 transition-colors" placeholder="Your message here" rows="8"></textarea>
              </div>
              <div className="flex justify-center">
                <button className="rounded-full bg-gray-900 dark:bg-gray-600 text-white dark:text-gray-200 font-bold py-4 px-6 min-w-40 hover:bg-gray-800 dark:hover:bg-gray-500 transition-all">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



