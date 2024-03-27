export async function getCityName(lat, lng, apiKey) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();
      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        const cityComponent = addressComponents.find(component => component.types.includes('locality'));
        if (cityComponent) {
          return cityComponent.long_name;
        } else {
          throw new Error('City not found in the response.');
        }
      } else {
        throw new Error(data.error_message || 'Failed to retrieve city information.');
      }
    } catch (error) {
      console.error('Error retrieving city information:', error);
      throw error;
    }
  }
  