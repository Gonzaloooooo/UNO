CREATE TABLE IF NOT EXISTS unot_cartas_car (
    pk_car_id SERIAL PRIMARY KEY,
    car_code TEXT UNIQUE NOT NULL,
    car_color TEXT,
    car_value INTEGER, 
    car_number INTEGER,
    car_type TEXT,
    car_special BOOLEAN NOT NULL,
    car_class TEXT,
    car_color_code TEXT,
    car_url TEXT
);