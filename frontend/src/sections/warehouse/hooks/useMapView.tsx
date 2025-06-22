import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { notify } from "src/utils/toast-helper";





export function useMapView(){
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  function LocationSelector({
    selectedLocation,
    setSelectedLocation,
  }: {
    selectedLocation: { lat: number; lng: number } | null;
    setSelectedLocation: React.Dispatch<
      React.SetStateAction<{ lat: number; lng: number } | null>
    >;
  }) {
    useMapEvents({
      click(e) {
        setSelectedLocation(e.latlng);
      },
    });
  
    return selectedLocation ? <Marker position={selectedLocation} /> : null;
  }

  function SearchControl({ setSelectedLocation }: { setSelectedLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>> }) {
    const map = useMap();
  
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
  
      const searchControl = new (GeoSearchControl as any)({
        provider: provider,
        style: 'button', 
        autoComplete: true,
        autoCompleteDelay: 250,
        showMarker: false,
        showPopup: false,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
      });
  
      map.addControl(searchControl);
  
      map.on('geosearch/showlocation', (result: any) => {
        const { location } = result;
        setSelectedLocation({
          lat: location.y,
          lng: location.x,
        });
        map.setView([location.y, location.x], 13);
      });
  
      return () => {
        map.removeControl(searchControl);
        map.off('geosearch/showlocation');
      };
    }, [map, setSelectedLocation]);
  
    return null;
  }

  async function fetchLocationName(lat: number, lng: number): Promise<string> {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    if (!response.ok) {
      notify("Failed to fetch location name" , "error");
      throw new Error("Failed to fetch location name");
    }
    const data = await response.json();
    return data.display_name || "";
  }

  return {
    selectedLocation,
    setSelectedLocation,
    LocationSelector,
    SearchControl,
    fetchLocationName,
  };
}