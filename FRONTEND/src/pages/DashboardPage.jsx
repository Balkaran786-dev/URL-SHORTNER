import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-5xl border border-gray-200">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
         
        </h1>

        {/* URL Form */}
        <section className="mb-12">
          
          <UrlForm />
        </section>

        <div className="border-t border-dashed border-gray-300 my-10"></div>

        {/* User's Short URLs */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center border-b pb-2 border-gray-300">
            Your Shortened URLs
          </h2>
          <UserUrl />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
