import React from 'react';
import { Button } from './Button';

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  header,
  footer,
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {header && <header className="bg-gray-900 text-white p-4">{header}</header>}
      <main className="flex-1 p-4">{children}</main>
      {footer && <footer className="bg-gray-700 text-white p-4">{footer}</footer>}
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <h1>Welcome to Our Platform!</h1>
      <Button variant="outline" size="sm" className="ml-4">
        Get Started
      </Button>
    </header>
  );
};
