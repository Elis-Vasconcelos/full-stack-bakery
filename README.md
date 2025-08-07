### Sales Control and Bakery Queue

---

### Description

This is a collaborative project for a bakery's **sales control** and **customer queue management**. The goal of this activity is to create a **full-stack application** to manage bread sales and the customer queue. The application must be able to add and remove customers from the queue, track the quantity of bread sold, and maintain a history of orders.

The application will be developed with **NextJS** for the front-end and **ExpressJS** for the back-end, using **Typescript** for both parts. The database will be managed using **Prisma ORM** with **SQLite** as a relational database.

### Implemented Features

#### Mandatory Requirements

* **Add Person to Queue:** Adding a person to the queue increments the "People in Queue" counter, the "Bread Sold" counter, and the "Revenue."
* **Remove Person from Queue:** Removing a person from the queue only decrements the "People in Queue" counter.
* **Responsiveness:** The application will be responsive, ensuring a good user experience on mobile devices, tablets, and desktops.

#### Optional Requirements

* **Docker:** Using **Docker** to create containers and run both the back-end and front-end locally.
* **Edit Orders in Queue:** The functionality to edit orders in the queue will be implemented, which will increment the "Bread Sold" and "Revenue" counters.
* **Order History Screen:** A screen to display orders that have left the queue will be added, with the possibility of customizing its design.

### Design

The application's design was specified in **Figma** and can be accessed through the following link:

[Figma Design](https://www.figma.com/design/j8n0tlrXRZEk9R7IYUThs1/La-Padarie?node-id=2027-5&t=BG2t6UHN6Xm853K4-0)

### Live Application

The application can be viewed live at [**LinkedIn - View the live site**](https://www.linkedin.com/posts/mikelly-correia-75b85a203_ol%C3%A1-pessoal-gostaria-de-compartilhar-activity-7208165518682296321-oLf3?utm_source=share&utm_medium=member_desktop).

<img width="1920" height="1437" alt="Home" src="https://github.com/user-attachments/assets/d344bfc8-7928-4d13-8de7-2fd0419a8531" />

### Project Structure

* **client/**: Contains the front-end code, developed with **NextJS** and **React**.
* **server/**: Contains the back-end code, developed with **ExpressJS** and **Prisma ORM**.
* **database/**: Contains the SQLite database configuration and Prisma migrations.
* **docker-compose.yml**: A file to configure and run the Docker containers for the back-end and front-end services.


