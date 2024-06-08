import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './modules/App/App';
import './locales/i18n';
import './styles/index.css';

createRoot(document.getElementById('app')!).render(<App />);

