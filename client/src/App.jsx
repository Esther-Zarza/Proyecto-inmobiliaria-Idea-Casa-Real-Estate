import './App.css'
import { AuthContextProvider } from './context/AuthContextProvider'
import { AppRoutes } from './routes/AppRoutes'


function App() {  
  
  return (
    <div className='body'>
      <AuthContextProvider>        
        <AppRoutes/>        
      </AuthContextProvider>
    </div>
  )
}

export default App;

