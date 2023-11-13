import React from 'react';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
           <div className='MainApp'>
           
              <div className='ContentApp'>
                  <RouterProvider router={router}/>
              </div>
           </div>
       </PersistGate>
    </Provider>
  );
}

export default App;
