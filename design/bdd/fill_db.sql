
-----------------------ADMIN-----------------------
INSERT INTO ADMIN (admin_id, admin_name, admin_last_name, admin_username, admin_password) 
VALUES (1051212, 'Pepito', 'Sevilla', 'pepito','123');

-----------------------CATEGORY_PRODUCTS-----------------------
INSERT INTO CATEGORY_PRODUCTS (category_id, category_name, category_description)
VALUES (1, 'Concentrados', 'Concentrado para ganado');

-----------------------TYPE_PERSON-----------------------
INSERT INTO TYPE_PERSON (type_person_id, type_person_name, type_person_description)
VALUES(1,'Natural', 'Persona natural');

-----------------------TYPE_DOCUMENT-----------------------
INSERT INTO TYPE_DOCUMENT (type_document_id, type_document_name)
VALUES(1,'CC');

-----------------------CUSTOMERS-----------------------
INSERT INTO  CUSTOMERS (customer_id, type_person_id, type_document_id, customer_name,
						customer_last_name, customer_phone, customer_email) 
VALUES (1002366, 1, 1, 'Andres', 'Rivera', '3123223454', 'andresrivera@gmail.com');

-----------------------EMPLOYEES-----------------------
INSERT INTO EMPLOYEES (employee_id, admin_id, employee_name, employee_last_name, employee_phone,
					   employee_email, employee_user_name, employee_password)
VALUES (1002344, 1051212,'Luis', 'Perez','3234562353', 'luisperez@gmail.com', 'luisperez','luisp');

 -----------------------PRODUCTS-----------------------
INSERT INTO PRODUCTS (product_id, category_id, product_name, product_description, product_units,
					  product_price, product_status) 
VALUES (1, 1, 'rentaleche', 'rentaleche nutrimon', '55', 98000, TRUE);

-----------------------SALE-----------------------
---aca toca mirar como insertar fechas
INSERT INTO SALE (sale_id, employee_id, customer_id, sale_date, sale_details) 
VALUES (1, 1002344, 1002366, '2022-07-04', 'Ningun detalle');

-----------------------TAXES-----------------------
INSERT INTO TAXES (tax_id, tax_name, tax_description, tax_value) 
VALUES (1, 'IVA', 'IVA Anio 2022', 19);
 
-----------------------SALE_DESCRIPTION-----------------------
INSERT INTO SALE_DESCRIPTION (product_id, sale_id, description_id, tax_id, units, quantity, 
							  discount, total)
VALUES (1, 1, 1, 1, 12, 12, 0, 98000);


--INSERT INTO mi_tabla (id, nombre, ciudad) VALUES (1, 'Pepito', 'Sevilla');

 
 