
# News Management
News Management is a small web application that demos basic CRUD functions.

There are two key Objects in the project: Items (News) and Category. An item must belong to a category.

> In this project, the words "items" and "news" are considered equal.
> The author can use these two words interchangeably.

## Getting Started

Clone repository.

    git clone https://github.com/tdp1999/news-management.git

Access the cloned folder, install packages from npm 

    npm i 

Run server 

    npm run server
    
![1](https://user-images.githubusercontent.com/86217622/180649716-75eeeb97-412d-464a-aa47-9cc7249ef0e9.png)
(Screenshot after completing this step.)

Run project

    npm start

## Main function
- List, Create, Update, Delete News (Items)
- List, Create, Update, Delete News Category
- Pagination, Search, Sort, Filter Items by Status
- Pagination, Search, Sort Categories

## Tech stack
-   FE Frameword: Angular
-   UI Libraries: Tailwind, Material Angular
-   Mockup Server: json-server
-   RTE: TinyMCE

## Demo Screenshot

Home Page
![2](https://user-images.githubusercontent.com/86217622/180649843-a19302a8-23c5-4c37-b4c6-bcf5472f6044.png)

### Category

List of Categories, presented as a table (datatable). The table includes columns name, creation date, and action.
![image](https://user-images.githubusercontent.com/86217622/180649902-fa443801-3a2a-4314-ab3d-840f6fe45117.png)

To create a new category, click the "Add New Category" button. A dialog will appear allowing you to enter the name of the category.
![image](https://user-images.githubusercontent.com/86217622/180650098-099c6bdd-5ca7-462a-baa8-aec09587bc29.png)

We can search for any category based on its name. Results displayed when querying in the search bar:
![image](https://user-images.githubusercontent.com/86217622/180650121-3b0ccd7e-e3b9-4144-915f-67d9806a8389.png)

### Item

List of categories, presented as a table (datatable). In the table there are columns: title of item, status (publish / draft), date of creation and action.
![image](https://user-images.githubusercontent.com/86217622/180650213-1046c6b3-5dbe-4455-9389-ac3597e39ae1.png)

To create a new item, click the add new item button. That action will lead to a new page. The new page contains a form used to fill in the necessary information. All fields in this form are required.
![image](https://user-images.githubusercontent.com/86217622/180650288-786cf71e-5fee-481d-ac22-da5d7ccc3a19.png)

In this page there are also some item filtering functions such as filtering based on status, or filtering based on creation date.
![image](https://user-images.githubusercontent.com/86217622/180650381-2084e054-0b06-4167-8b99-f91d5561065e.png)

## Further help & Contact
If you have difficulty installing or using, please create an issue on this repository, or email to tdp99.business@gmail.com
