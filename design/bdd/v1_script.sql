/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     09/07/2022 12:07:12 p.m.                     */
/*==============================================================*/


drop index ADMIN_PK;

drop table ADMIN;

drop index CATEGORY_PRODUCTS_PK;

drop table CATEGORY_PRODUCTS;

drop index R9_FK;

drop index R8_FK;

drop index CUSTOMERS_PK;

drop table CUSTOMERS;

drop index R1_FK;

drop index EMPLOYEES_PK;

drop table EMPLOYEES;

drop index R2_FK;

drop index PRODUCTS_PK;

drop table PRODUCTS;

drop index R4_FK;

drop index R3_FK;

drop index SALE_PK;

drop table SALE;

drop index R7_FK;

drop index R6_FK;

drop index R5_FK;

drop index SALE_DESCRIPTION_PK;

drop table SALE_DESCRIPTION;

drop index TAXES_PK;

drop table TAXES;

drop index TYPE_DOCUMENT_PK;

drop table TYPE_DOCUMENT;

drop index TYPE_PERSON_PK;

drop table TYPE_PERSON;

/*==============================================================*/
/* Table: ADMIN                                                 */
/*==============================================================*/
create table ADMIN (
   ADMIN_ID             INT4                 not null,
   ADMIN_NAME           VARCHAR(45)          not null,
   ADMIN_LAST_NAME      VARCHAR(45)          not null,
   ADMIN_USERNAME       VARCHAR(45)          not null,
   ADMIN_PASSWORD       VARCHAR(45)          not null,
   constraint PK_ADMIN primary key (ADMIN_ID)
);

/*==============================================================*/
/* Index: ADMIN_PK                                              */
/*==============================================================*/
create unique index ADMIN_PK on ADMIN (
ADMIN_ID
);

/*==============================================================*/
/* Table: CATEGORY_PRODUCTS                                     */
/*==============================================================*/
create table CATEGORY_PRODUCTS (
   CATEGORY_ID          INT4                 not null,
   CATEGORY_NAME        VARCHAR(45)          not null,
   CATEGORY_DESCRIPTION VARCHAR(45)          not null,
   constraint PK_CATEGORY_PRODUCTS primary key (CATEGORY_ID)
);

/*==============================================================*/
/* Index: CATEGORY_PRODUCTS_PK                                  */
/*==============================================================*/
create unique index CATEGORY_PRODUCTS_PK on CATEGORY_PRODUCTS (
CATEGORY_ID
);

/*==============================================================*/
/* Table: CUSTOMERS                                             */
/*==============================================================*/
create table CUSTOMERS (
   CUSTOMER_ID          INT4                 not null,
   TYPE_PERSON_ID       INT4                 not null,
   TYPE_DOCUMENT_ID     INT4                 not null,
   CUSTOMER_NAME        VARCHAR(45)          not null,
   CUSTOMER_LAST_NAME   VARCHAR(45)          not null,
   CUSTOMER_PHONE       VARCHAR(10)          not null,
   CUSTOMER_EMAIL       VARCHAR(100)         not null,
   constraint PK_CUSTOMERS primary key (CUSTOMER_ID)
);

/*==============================================================*/
/* Index: CUSTOMERS_PK                                          */
/*==============================================================*/
create unique index CUSTOMERS_PK on CUSTOMERS (
CUSTOMER_ID
);

/*==============================================================*/
/* Index: R8_FK                                                 */
/*==============================================================*/
create  index R8_FK on CUSTOMERS (
TYPE_PERSON_ID
);

/*==============================================================*/
/* Index: R9_FK                                                 */
/*==============================================================*/
create  index R9_FK on CUSTOMERS (
TYPE_DOCUMENT_ID
);

/*==============================================================*/
/* Table: EMPLOYEES                                             */
/*==============================================================*/
create table EMPLOYEES (
   EMPLOYEE_ID          INT4                 not null,
   ADMIN_ID             INT4                 not null,
   EMPLOYEE_NAME        VARCHAR(45)          not null,
   EMPLOYEE_LAST_NAME   VARCHAR(45)          not null,
   EMPLOYEE_PHONE       VARCHAR(10)          not null,
   EMPLOYEE_EMAIL       VARCHAR(100)         not null,
   EMPLOYEE_USER_NAME   VARCHAR(45)          not null,
   EMPLOYEE_PASSWORD    VARCHAR(45)          not null,
   constraint PK_EMPLOYEES primary key (EMPLOYEE_ID)
);

/*==============================================================*/
/* Index: EMPLOYEES_PK                                          */
/*==============================================================*/
create unique index EMPLOYEES_PK on EMPLOYEES (
EMPLOYEE_ID
);

/*==============================================================*/
/* Index: R1_FK                                                 */
/*==============================================================*/
create  index R1_FK on EMPLOYEES (
ADMIN_ID
);

/*==============================================================*/
/* Table: PRODUCTS                                              */
/*==============================================================*/
create table PRODUCTS (
   PRODUCT_ID           INT4                 not null,
   CATEGORY_ID          INT4                 not null,
   PRODUCT_NAME         VARCHAR(45)          not null,
   PRODUCT_DESCRIPTION  VARCHAR(45)          not null,
   PRODUCT_UNITS        VARCHAR(45)          not null,
   PRODUCT_PRICE        MONEY                not null,
   PRODUCT_STATUS       BOOL                 not null,
   constraint PK_PRODUCTS primary key (PRODUCT_ID)
);

/*==============================================================*/
/* Index: PRODUCTS_PK                                           */
/*==============================================================*/
create unique index PRODUCTS_PK on PRODUCTS (
PRODUCT_ID
);

/*==============================================================*/
/* Index: R2_FK                                                 */
/*==============================================================*/
create  index R2_FK on PRODUCTS (
CATEGORY_ID
);

/*==============================================================*/
/* Table: SALE                                                  */
/*==============================================================*/
create table SALE (
   SALE_ID              INT4                 not null,
   EMPLOYEE_ID          INT4                 not null,
   CUSTOMER_ID          INT4                 not null,
   SALE_DATE            DATE                 not null,
   SALE_DETAILS         VARCHAR(45)          not null,
   constraint PK_SALE primary key (SALE_ID)
);

/*==============================================================*/
/* Index: SALE_PK                                               */
/*==============================================================*/
create unique index SALE_PK on SALE (
SALE_ID
);

/*==============================================================*/
/* Index: R3_FK                                                 */
/*==============================================================*/
create  index R3_FK on SALE (
EMPLOYEE_ID
);

/*==============================================================*/
/* Index: R4_FK                                                 */
/*==============================================================*/
create  index R4_FK on SALE (
CUSTOMER_ID
);

/*==============================================================*/
/* Table: SALE_DESCRIPTION                                      */
/*==============================================================*/
create table SALE_DESCRIPTION (
   PRODUCT_ID           INT4                 not null,
   SALE_ID              INT4                 not null,
   DESCRIPTION_ID       INT4                 not null,
   TAX_ID               INT4                 null,
   UNITS                INT4                 not null,
   QUANTITY             INT4                 not null,
   DISCOUNT             MONEY                null,
   TOTAL                MONEY                not null,
   constraint PK_SALE_DESCRIPTION primary key (PRODUCT_ID, SALE_ID, DESCRIPTION_ID)
);

/*==============================================================*/
/* Index: SALE_DESCRIPTION_PK                                   */
/*==============================================================*/
create unique index SALE_DESCRIPTION_PK on SALE_DESCRIPTION (
PRODUCT_ID,
SALE_ID,
DESCRIPTION_ID
);

/*==============================================================*/
/* Index: R5_FK                                                 */
/*==============================================================*/
create  index R5_FK on SALE_DESCRIPTION (
SALE_ID
);

/*==============================================================*/
/* Index: R6_FK                                                 */
/*==============================================================*/
create  index R6_FK on SALE_DESCRIPTION (
PRODUCT_ID
);

/*==============================================================*/
/* Index: R7_FK                                                 */
/*==============================================================*/
create  index R7_FK on SALE_DESCRIPTION (
TAX_ID
);

/*==============================================================*/
/* Table: TAXES                                                 */
/*==============================================================*/
create table TAXES (
   TAX_ID               INT4                 not null,
   TAX_NAME             CHAR(45)             not null,
   TAX_DESCRIPTION      VARCHAR(45)          not null,
   TAX_VALUE            NUMERIC              not null,
   constraint PK_TAXES primary key (TAX_ID)
);

/*==============================================================*/
/* Index: TAXES_PK                                              */
/*==============================================================*/
create unique index TAXES_PK on TAXES (
TAX_ID
);

/*==============================================================*/
/* Table: TYPE_DOCUMENT                                         */
/*==============================================================*/
create table TYPE_DOCUMENT (
   TYPE_DOCUMENT_ID     INT4                 not null,
   TYPE_DOCUMENT_NAME   VARCHAR(45)          not null,
   constraint PK_TYPE_DOCUMENT primary key (TYPE_DOCUMENT_ID)
);

/*==============================================================*/
/* Index: TYPE_DOCUMENT_PK                                      */
/*==============================================================*/
create unique index TYPE_DOCUMENT_PK on TYPE_DOCUMENT (
TYPE_DOCUMENT_ID
);

/*==============================================================*/
/* Table: TYPE_PERSON                                           */
/*==============================================================*/
create table TYPE_PERSON (
   TYPE_PERSON_ID       INT4                 not null,
   TYPE_PERSON_NAME     VARCHAR(45)          not null,
   TYPE_PERSON_DESCRIPTION VARCHAR(45)          not null,
   constraint PK_TYPE_PERSON primary key (TYPE_PERSON_ID)
);

/*==============================================================*/
/* Index: TYPE_PERSON_PK                                        */
/*==============================================================*/
create unique index TYPE_PERSON_PK on TYPE_PERSON (
TYPE_PERSON_ID
);

alter table CUSTOMERS
   add constraint FK_CUSTOMER_R8_TYPE_PER foreign key (TYPE_PERSON_ID)
      references TYPE_PERSON (TYPE_PERSON_ID)
      on delete restrict on update restrict;

alter table CUSTOMERS
   add constraint FK_CUSTOMER_R9_TYPE_DOC foreign key (TYPE_DOCUMENT_ID)
      references TYPE_DOCUMENT (TYPE_DOCUMENT_ID)
      on delete restrict on update restrict;

alter table EMPLOYEES
   add constraint FK_EMPLOYEE_R1_ADMIN foreign key (ADMIN_ID)
      references ADMIN (ADMIN_ID)
      on delete restrict on update restrict;

alter table PRODUCTS
   add constraint FK_PRODUCTS_R2_CATEGORY foreign key (CATEGORY_ID)
      references CATEGORY_PRODUCTS (CATEGORY_ID)
      on delete restrict on update restrict;

alter table SALE
   add constraint FK_SALE_R3_EMPLOYEE foreign key (EMPLOYEE_ID)
      references EMPLOYEES (EMPLOYEE_ID)
      on delete restrict on update restrict;

alter table SALE
   add constraint FK_SALE_R4_CUSTOMER foreign key (CUSTOMER_ID)
      references CUSTOMERS (CUSTOMER_ID)
      on delete restrict on update restrict;

alter table SALE_DESCRIPTION
   add constraint FK_SALE_DES_R5_SALE foreign key (SALE_ID)
      references SALE (SALE_ID)
      on delete restrict on update restrict;

alter table SALE_DESCRIPTION
   add constraint FK_SALE_DES_R6_PRODUCTS foreign key (PRODUCT_ID)
      references PRODUCTS (PRODUCT_ID)
      on delete restrict on update restrict;

alter table SALE_DESCRIPTION
   add constraint FK_SALE_DES_R7_TAXES foreign key (TAX_ID)
      references TAXES (TAX_ID)
      on delete restrict on update restrict;

