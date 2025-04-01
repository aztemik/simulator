import { useEffect, useState } from 'react';
import supabase from './supabase';

export const useRealtimeData = (tableName) => {

    const [data, setData] = useState([]);
    const [channel, setChannel] = useState(null);

    // Función para obtener datos iniciales
    const fetchInitialData = async () => {
        const { data: initialData, error } = await supabase
        .from(tableName)
        .select('*');

        if (!error) setData(initialData);
        // console.log("Fetch inicial", initialData)
    };

    // Configurar el canal de tiempo real
    const setupRealtime = () => {
        const newChannel = supabase
        .channel('custom-channel')
        .on(
            'postgres_changes',
            {
            event: '*',
            schema: 'public',
            table: tableName
            },
            (payload) => {
            // Lógica genérica de actualización
            switch (payload.eventType) {
                case 'INSERT':
                setData(current => [...current, payload.new]);
                break;
                case 'UPDATE':
                setData(current => current.map(item => 
                    item.id === payload.new.id ? payload.new : item
                ));
                break;
                case 'DELETE':
                setData(current => current.filter(item => 
                    item.id !== payload.old.id
                ));
                break;
            }
            }
        )
        .subscribe();

        setChannel(newChannel);
        return newChannel;
    };

    // Efecto principal
    useEffect(() => {
        fetchInitialData();
        const channelInstance = setupRealtime();

        return () => {
        channelInstance?.unsubscribe();
        };
    }, [tableName]);

    return {
        data,
        channel,
        stopUpdates: () => channel?.unsubscribe()
    };
};