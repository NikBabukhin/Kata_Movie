import React, { createContext, useContext } from "react";
import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './App';

export type GenresContextType = {
  [key: number]: string,
}
export const GenresContext = createContext<GenresContextType>({} as GenresContextType)
export const useGenresContext = () => useContext(GenresContext)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
