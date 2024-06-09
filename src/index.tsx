import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import { App } from './modules/App/App';
import './locales/i18n';
import './shared/styles/index.css';
import dotenv from 'dotenv';
dotenv.config();

createRoot(document.getElementById('app')!).render(<App />);
