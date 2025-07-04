# Inventory Management System UI & Rest API Using Spring Boot & React
***
The Inventory Management System, Invtracker, offers a range of endpoints that enable administrative management of stock, warehouses, suppliers, and users. Additionally, it provides clients with the ability to purchase selected products from the available inventory.

## 🚀 Main Features of the Application

### ✅ RESTful APIs (Spring Boot) for managing, filtering and extracting:
- **Warehouses** – Includes a map interface to select and add warehouse locations with coordinates  
- **Suppliers** – Full CRUD operations  
- **Products** – Manage inventory details and availability  
- **Customer Orders** – Handle product orders with the ability to confirm or cancel requests 
- **Users** - Registration and CRUD operations

### 📊 Dynamic Dashboard
- Displays over 10 KPIs related to stock status  
- Visualized using **Material UI (MUI)**  

### 📅 Integrated Calendar
- Allows planning and tracking of inventory management tasks  

### 🛒 Customer Area
- User registration and authentication  
- Shopping cart management  
- Product reviews and rating system  


## 💻 Technologies used
![spring-boot](https://github.com/user-attachments/assets/c388bb4f-739c-4483-9935-f558f9347b47)
![react](https://github.com/user-attachments/assets/58af1503-42ef-4011-864e-474c7677bb27)
![postgresql](https://github.com/user-attachments/assets/591c1875-8700-4d3c-8131-dd4d81cd9837)
![Docker](https://github.com/user-attachments/assets/7ca3adce-7e43-4873-9e5f-663d4cff0715)
![postman](https://github.com/user-attachments/assets/d9cec757-8dbf-4f16-bd9c-4c75d2d2261c)
![maven](https://github.com/user-attachments/assets/6957143d-14b5-49eb-97ef-6c660a4fad86)


## 🔧 Installation and setup
1. Clone the repository `git clone https://github.com/yskalli01/invtracker.git`
2. Navigate to the project folder `cd invtracker`
3. Then navigate to the backend folder `cd backend`
4. Run the postgresql container with docker-compose using this command `docker-compose up`
5. Run the backend application `mvn spring-boot:run`
6. Open a new terminal tab and navigate to the frontend folder `cd frontend`
7. Install frontend dependencies `npm i`
8. Run the frontend application `npm run dev`
9. Set up Syncfusion calendar (optional):  
   9.1. Generate a free Syncfusion API key  
   9.2. Create a `.env` file inside the `frontend` folder and add:  
        ```
        VITE_SYNCFUSION_KEY=your_api_key_here
        ```



## 📸 Screenshots
![project](https://github.com/user-attachments/assets/0e1ea28d-d956-40cf-930f-4e7131078d21)









