const url = "http://localhost:5005/agenda/";
async function logEvents() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data
    } catch (err) {
    return [];
    }}

export default logEvents;