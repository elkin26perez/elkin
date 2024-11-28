import './App.css'
import Routing from './router/Routing'

function App() {

  return (
    <div className='m-[0,auto]  w-full p-0  flex h-screen grow flex-1 flex-col'>
      <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
        <Routing/>
    </div>
  )
}

export default App
