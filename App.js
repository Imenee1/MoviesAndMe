import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux';
import Store from './Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import Login from './Login_App/Login'
export default class App extends React.Component {
  render() {
    //return( <Login/>)
   let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
      
    )
  }
}