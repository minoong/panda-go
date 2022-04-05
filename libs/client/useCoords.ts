import {useToast} from '@components/toast/ToastProvider';
import {useEffect, useState} from 'react';

console.log(1);

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
 const [isMounted, setIsMounted] = useState<boolean>(false);

 useEffect(() => {
  const {geolocation} = navigator;

  if (!geolocation) {
   return;
  }

  const onSuccess = ({coords: {latitude, longitude}}: GeolocationPosition) => {
   if (latitude === null || longitude === null) return;

   setCoords((prev) => {
    if (JSON.stringify(prev) !== JSON.stringify({latitude, longitude})) {
     setIsMounted(true);
    }

    return {latitude, longitude};
   });
  };
  geolocation.getCurrentPosition(onSuccess);
 }, [toast]);

 useEffect(() => {
  if (isMounted) {
   toast?.push('위치 설정 완료.', 'Info', 700);
  }
 }, [isMounted]);

 return coords;
}
