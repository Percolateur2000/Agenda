const newAgenda = async () => {
    const response = await fetch("http://localhost:5005/agenda/", {
      method: "POST",
      body: JSON.stringify({
        text: document.getElementById("text").value,
        eventstart: document.getElementById("eventstart").value,
        eventend: document.getElementById("eventend").value,
        color: document.getElementById("color").value,
      }),
    });
    const data = await response.json();
    return data && window.location.reload();
  }

  const hour = Array(24).fill(0).map((_, i) => i);

const NewAgenda = () => {
    return (
        <div>
        <input id='text' type="text" placeholder='Titre' />
        <input id='eventstart' type="date" placeholder='eventstart' />
        <select id='hourstart'><option>{hour}</option></select>
        <input id='eventend' type="date" placeholder='eventend'  />
        <select id='hourend'><option>{hour}</option></select>
        <input id='color' type='color' />
        <button onClick={newAgenda}>Submit</button>
      </div>
    );
};

export default NewAgenda;