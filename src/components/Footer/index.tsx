import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t z-[100] from-sky-900 to-blue-700">
      <div className="container">
        <div className="flex w-full justify-center">
          <div>
            <p className="text-white text-lg uppercase">
              Clouds, Inc . All copyright reserved {new Date().getFullYear().toString()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
