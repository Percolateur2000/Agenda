import logEvents from "./FetchApi";

const events =  await logEvents();


  const deleteAgenda = async (id) => {
    const response = await fetch(`http://localhost:5005/agenda/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data && window.location.reload();
  }
  
  const Event =  () => {
    return (
        <div id="list" >{Object.values(events).map((event) => <div key={event.id}>{event.id} {event.text} {event.eventstart} {event.eventend} {event.color} <button onClick={() => deleteAgenda(event.id)}>Delete</button></div>)}</div>
    );
  };
  
  export default Event;