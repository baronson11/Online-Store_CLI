DROP DATABASE IF EXISTS b_amazon;

CREATE DATABASE b_amazon;
USE b_amazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name varchar(30) not null,
    department_name varchar(30) not null,
    price DECIMAL(10,2) not null,
    stock_quantity INT not null,
    PRIMARY KEY (item_id)
);

INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Toothpaste', 'Hygiene/Home', 4.99, 100);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Oranges', 'Food', 2.99, 56);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Cat Food', 'Pet Supplies', 4.99, 201);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Soap', 'Hygiene/Home', 5.99, 870);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Sponges', 'Hygiene/Home', 1.99, 1000);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Bananas', 'Food', 0.99, 25);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('USB Cable', 'Electronics', 9.99, 500);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Magic The Gathering Intro Pack', 'Toys/Games', 14.99, 20);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Eggs', 'Dairy', 4.99, 100);
INSERT INTO b_amazon.products (product_name, department_name, price, stock_quantity)
	VALUES ('Settlers of Catan', 'Toys/Games', 49.99, 2);

-- SELECT * FROM products.b_amazon
-- WHERE department_name = "Toys/Games";
