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

 useEffect(() => {
  const {geolocation} = navigator;

  if (!geolocation) {
   return;
  }

  const onSuccess = ({coords: {latitude, longitude}}: GeolocationPosition) => {
   if (latitude === null || longitude === null) return;

   let updated = false;

   setCoords((prev) => {
    if (JSON.stringify(prev) !== JSON.stringify({latitude, longitude})) {
     updated = true;
    }

    return {latitude, longitude};
   });

   if (updated) {
    toast?.push('위치 설정 완료.', 'Info', 700);
   }
  };
  geolocation.getCurrentPosition(onSuccess);
 }, [toast]);

 return coords;
}
