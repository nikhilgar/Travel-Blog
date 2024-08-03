// script.js
document.getElementById('routeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    // Call your server endpoint to calculate distance
    const response = await fetch(`/calculateDistance?source=${source}&destination=${destination}`);
    const data = await response.json();

    // Display total distance
    document.getElementById('distance').innerText = `Total Distance: ${data.distance} km`;

    // Call your server endpoint to get popular places
    const placesResponse = await fetch(`/popularPlaces?destination=${destination}`);
    const placesData = await placesResponse.json();

    // Display popular places
    const popularPlacesElement = document.getElementById('popularPlaces');
    popularPlacesElement.innerHTML = '<h2>Popular Places to Visit</h2>';
    placesData.places.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.textContent = place.name;
        popularPlacesElement.appendChild(placeElement);
    });
});
