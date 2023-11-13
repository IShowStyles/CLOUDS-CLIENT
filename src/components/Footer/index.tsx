import React from 'react';

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-blue-400 text-base-content">
      <aside>
        <div className="flex w-full justify-center">
          <div>
            <p className="text-white text-lg uppercase">
              Clouds, Inc . All copyright reserved {new Date().getFullYear().toString()}
            </p>
          </div>
        </div>
      </aside>
    </footer>
  );
}
