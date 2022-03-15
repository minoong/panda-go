import {useToast} from '@components/toast/ToastProvider';
import {useEffect, useState} from 'react';

interface UseCoordState {
 longitude: number | null;
 latitude: number | null;
}

export default function useCoords() {
 const toast = useToast();
 const [coords, setCoords] = useState<UseCoordState>({
  longitude: null,
  latitude: null,
 });

 const onSuccess = ({coords: {latitude, longitude}}: GeolocationPosition) => {
  setCoords((prev) => {
   if (JSON.stringify(prev) !== JSON.stringify({latitude, longitude})) {
    toast?.push('위치 설정 완료.', 'Info', 1500);
   }

   return {latitude, longitude};
  });
 };

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(onSuccess);
 }, []);

 return coords;
}
