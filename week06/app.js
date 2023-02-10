addEventListener("submit", function(event) {
    event.preventDefault();
    const address = document.getElementById("address").value;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDcuPILDwMzFXCtXfahiJTapycjyqdy6jw&callback=initMap`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === "OK") {
        const result = data.results[0];
        const formattedAddress = result.formatted_address;
        const addressComponents = result.address_components;
        const location = result.geometry.location;
        let addressDetails = "";
        addressComponents.forEach(component => {
          addressDetails += `<p>${component.types[0]}: ${component.long_name}</p>`;
        });
        document.getElementById("result").innerHTML = `
          <p>Formatted Address: ${formattedAddress}</p>
          ${addressDetails}
          <p>Latitude: ${location.lat}</p>
          <p>Longitude: ${location.lng}</p>
        `;
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lng);
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: {lat: lat, lng: lng}
        });
        const marker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
        });
      } else {
        document.getElementById("result").innerHTML = `
          <p>Address not found.</p>
        `;
      } 
    });
});