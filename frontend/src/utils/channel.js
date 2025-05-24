import { useEffect, useState } from 'react';
import supabase from './supabase';

export const useRealtimeData = (tableName) => {

    const [data, setData] = useState([]);
    const [channel, setChannel] = useState(null);

    // Función para obtener datos iniciales
    const fetchInitialData = async () => {
        const { data: initialData, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(15);

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

        return () => supabase.removeChannel(channelInstance);
    }, [tableName]);

    return {
        data,
        channel
    };
};

export const useServicesData = () => {
  const [services, setServices] = useState([]); // Servicios para encabezados
  const [suppliersWithServices, setSuppliersWithServices] = useState([]); // Relaciones

  // Obtener servicios (applicable_services)
  const fetchServices = async () => {
    const { data, error } = await supabase.from('applicable_services').select('*');
    if (!error) setServices(data);
  };

  // Obtener relaciones (supplier_services con JOIN)
  const fetchSupplierServices = async () => {
    const { data, error } = await supabase
      .from('supplier_services')
      .select(`*, fk_supplier:suppliers(*), fk_applicable_service:applicable_services(*)`);
    if (!error) setSuppliersWithServices(data);
  };

  // Suscribirse a cambios en las 3 tablas
  useEffect(() => {
    fetchServices();
    fetchSupplierServices();

    const channel = supabase.channel('dynamic-table-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'supplier_services' }, () => {
        fetchSupplierServices();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applicable_services' }, () => {
        fetchServices(); // Actualizar encabezados si hay nuevos servicios
        fetchSupplierServices();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'suppliers' }, fetchSupplierServices)
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  return { services, suppliersWithServices };
};

export const UserCounts = () => {
  const [counts, setCounts] = useState({ service1: 0, service2: 0 });

  const fetchCounts = async () => {
    // Consulta para service = 1
    const { count: count1 } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('fk_available_service', 1); // .eq() en lugar de .in()

    // Consulta para service = 2
    const { count: count2 } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('fk_available_service', 2);

    setCounts({
      service1: count1 || 0,
      service2: count2 || 0
    });
  };

  useEffect(() => {
    fetchCounts();

    const channel = supabase
      .channel('realtime-users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, fetchCounts)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return counts; // { service1: número, service2: número }
};