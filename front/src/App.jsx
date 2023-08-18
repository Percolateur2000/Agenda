import './App.css'
import Event from './components/Event';
import logEvents from './components/FetchApi';
import NewAgenda from './components/NewAgenda';

const events = await logEvents();

function App() {

  return (<>
    <div>Hello agenda</div>
    <NewAgenda />
    <div>{events.length} events</div>
    <Event />
    </>
  )
}

export default App