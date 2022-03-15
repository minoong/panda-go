import {useEffect, useState} from 'react';

interface UseCoordState {
 longitude: number | null;
 latitude: number | null;
}

export default function useCoords() {
 const [coords, setCoords] = useState<UseCoordState>({
  longitude: null,
  latitude: null,
 });

 const onSuccess = ({coords: {latitude, longitude}}: GeolocationPosition) => {
  setCoords({latitude, longitude});
 };

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(onSuccess);
 }, []);

 return coords;
}
