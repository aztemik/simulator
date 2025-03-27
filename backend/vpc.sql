create table if not exists available_suscriptions(
  idSuscripton serial primary key,
  suscription_type varchar(255)
);

create table if not exists suppliers(
  idSupplier serial primary key,
  supplier_name varchar(255),
  unidad_de_medida varchar(255),
  costo_unitario int,
  short_description varchar(255)
);

create table if not exists general_data(
  idGeneralData serial primary key,
  general_data_name varchar(255),
  amount_general_data int
);

create table if not exists monthly_costs(
  idMonthlyCosts serial primary key,
  service_name varchar (255),
  total int
);

