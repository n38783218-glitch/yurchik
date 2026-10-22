import { up } from '../migration.js';
async function createDB() {
  await up(`PRAGMA foreign_keys = ON;`);
  // create Item table
  await up(`
  create table if not exists item(
    id integer primary key autoincrement,
    is_deleted boolean,
    location_id integer not null,
    current_location_id integer not null,
    categoty_id integer not null,
    name text not null,
    properties jsonb not null,
    status text not null,
    foreign key (location_id) references location(id),
    foreign key (current_location_id) references location(id),
    foreign key (categoty_id) references category(id)
  );
  `);
  // create Location table
  await up(`
    create table if not exists location(
      id integer primary key autoincrement,
      place_id integer not null,
      name text not null,
      foreign key (place_id) references place(id)
        on delete cascade
    );
  `);
  // create Category table
  await up(`
    create table if not exists category(
      id integer primary key autoincrement,
      name text not null,
      parent_id integer,
      foreign key (parent_id) references category(id)
        on delete set null
    );
  `);
  // create Place table
  await up(`
    create table if not exists place(
      id integer primary key autoincrement,
      room_id integer,
      name text not null,
      foreign key (room_id) references room(id)
        on delete cascade
    );
  `);
  // create Room table
  await up(`
    create table if not exists room(
      id integer primary key autoincrement,
      floor_id integer not null,
      name text not null,
      foreign key (floor_id) references floor(id)
        on delete cascade
  `);
  // create Floor table
  await up(`
    create table if not exists floor(
      id integer primary key autoincrement,
      structure_id integer not null,
      name text not null,
      foreign key (structure_id) references structure(id)
        on delete cascade
    );
  `);
  // create Structure table
  await up(`
    create table if not exists structure(
      id integer primary key autoincrement,
      name text not null,
  `);
}
