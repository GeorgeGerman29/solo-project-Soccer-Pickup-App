
import './styles/main.scss'
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

const container = document.getElementById('app'); // Get the root element
const root = createRoot(container); // Create a root
root.render(<App />); // Render your App inside the root
