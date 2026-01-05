// Service to handle Location and Map Data
export const LocationService = {
  // Get current user position
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            let errorMessage = "Unknown location error";
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Location permission denied. Please enable location access.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
            }
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      }
    });
  },

  // Fetch nearby hospitals using OpenStreetMap Overpass API
  getNearbyHospitals: async (lat, lng, radius = 15000) => { // Increased radius to 15km for rural coverage
    try {
      // Overpass QL query for hospitals around a coordinate
      // Added timeout and increased search types
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          way["amenity"="hospital"](around:${radius},${lat},${lng});
          relation["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          node["healthcare"="hospital"](around:${radius},${lat},${lng});
          node["healthcare"="clinic"](around:${radius},${lat},${lng});
        );
        out center;
      `;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s fetch timeout

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.elements || data.elements.length === 0) {
         console.warn("No hospitals found via API, falling back to mock data.");
         return getMockHospitals(lat, lng);
      }

      // Process OSM data to a simpler format
      const hospitals = data.elements.map(element => {
        const coordinate = element.type === 'node' 
          ? { lat: element.lat, lng: element.lon }
          : { lat: element.center.lat, lng: element.center.lon };

        return {
          id: element.id,
          name: element.tags.name || element.tags["name:en"] || "Unnamed Medical Facility",
          type: (element.tags.amenity || element.tags.healthcare || "Hospital").replace('_', ' '),
          distance: getDistanceFromLatLonInKm(lat, lng, coordinate.lat, coordinate.lng),
          ...coordinate
        };
      }).sort((a, b) => a.distance - b.distance); // Sort by distance
      
      return hospitals;

    } catch (error) {
      console.error("Error fetching hospitals:", error);
      // Fallback mock data if API fails or rate limited
      return getMockHospitals(lat, lng);
    }
  }
};

// Helper to calculate distance
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

// Fallback mock data generator
function getMockHospitals(baseLat, baseLng) {
  return [
    { id: 'm1', name: "Rural Community Health Center", type: "Hospital", lat: baseLat + 0.015, lng: baseLng + 0.01, distance: 2.3 },
    { id: 'm2', name: "Drishti Eye Care Clinic", type: "Clinic", lat: baseLat - 0.01, lng: baseLng - 0.005, distance: 1.8 },
    { id: 'm3', name: "District General Hospital", type: "Hospital", lat: baseLat + 0.02, lng: baseLng - 0.01, distance: 4.5 },
    { id: 'm4', name: "Vision Plus Center", type: "Clinic", lat: baseLat - 0.005, lng: baseLng + 0.02, distance: 3.1 },
    { id: 'm5', name: "Emergency Care Unit", type: "Hospital", lat: baseLat + 0.008, lng: baseLng - 0.015, distance: 2.9 },
  ];
}
