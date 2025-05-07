import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import LanguagesView from './components/views/languages/LanguagesView.tsx';
import HeadersView from './components/views/HeadersView.tsx';
import DashboardView from './components/views/DashboardView.tsx';
import LanguageView from './components/views/languages/LanguageView.tsx';
import LanguageEdit from './components/views/languages/LanguageEdit.tsx';
import LanguageNew from './components/views/languages/LanguageNew.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={ <DashboardView />} />
          <Route path='/languages' element={ <LanguagesView /> } />
          <Route path='/languages/new' element={ <LanguageNew /> } />
          <Route path='/languages/:language_id/view' element={ <LanguageView /> } />
          <Route path='/languages/:language_id/edit' element={ <LanguageEdit /> } />
          <Route path='/headers' element={ <HeadersView /> }></Route>
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
