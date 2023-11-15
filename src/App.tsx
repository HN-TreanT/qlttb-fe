import React from 'react';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
           <div className='MainApp'>
           
              <div className='ContentApp'>      
                  <Suspense >
                  {/* <AppRoutes/> */}
                     <RouterProvider router={router}/>
                  </Suspense>
              </div>
           </div>
       </PersistGate>
    </Provider>
  );
}

export default App;
