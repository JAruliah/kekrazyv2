import React from 'react';
import { Header } from '../Common/Header'
import Script from 'next/script';

interface DefaultLayoutProps {
  children: React.ReactNode
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
      <div className='content'>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></Script>
        <Header />
        <div className='container'>
          { children }
        </div>
      </div>
    )
}