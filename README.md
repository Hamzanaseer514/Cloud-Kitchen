# **Cloud Kitchen** 🍽️🚀  
A **modern and efficient** cloud kitchen management system that allows **chefs** to run their virtual kitchens seamlessly. With a robust authentication system and an approval-based kitchen registration process, this platform ensures **quality and trust** between chefs and customers.  

---
## **Figma Design**
View the latest UI/UX designs here: [Figma Link](https://www.figma.com/design/eCzUV3i3tALpBvOHxTyiU6/Cloud-Kitchen?node-id=0-1&t=Z8vicOtkh9vImcOE-1)

---

## **Canva Presentation**
View the latest Presentation here: [Canva Presentation Link](https://www.canva.com/design/DAGh6Bxc96E/0kHqHhtprDG69rdExJ2KLw/edit?utm_content=DAGh6Bxc96E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## **🚀 Features**  
✅ **User Authentication:** Secure login and registration system with role-based access (Chef, Customer, Admin).  
✅ **Kitchen Management:** Chefs can register their kitchens, update details, and manage their menus.  
✅ **Approval System:** Only **approved kitchens** can operate, ensuring trust and quality.  
✅ **Profile Management:** Users can update their profile details, including full name and contact information.  
✅ **Secure API:** Built with authentication and authorization for data security.  

---

## **🛠️ Tech Stack**  
🔹 **Backend:** Node.js, Express.js, MongoDB, Mongoose  
🔹 **Authentication:** JWT (JSON Web Token)  
🔹 **Database:** MongoDB  
🔹 **Middleware:** Async Handler, Custom Error Handling  

---

## **📌 API Endpoints**  
### **🔑 Authentication**
| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login a user |
| GET    | `/api/auth/me`       | Get current logged-in user |
| PUT    | `/api/auth/updateProfile` | Update user profile |
| GET    | `/api/auth/logout`   | Logout user |

### **🍽️ Kitchen Management**
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| POST   | `/api/kitchen/register`  | Register a new kitchen |
| PUT    | `/api/kitchen/:id`       | Update kitchen details |
| GET    | `/api/kitchen`           | Get all kitchens |
| GET    | `/api/kitchen/:id`       | Get a specific kitchen |

---

## **🛠 Installation & Setup**  
1️⃣ Clone the repository:  
```sh
git clone https://github.com/your-repo/cloud-kitchen.git
cd cloud-kitchen
```
2️⃣ Install dependencies:  
```sh
npm install
```
3️⃣ Create a `.env` file and configure environment variables:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```
4️⃣ Start the server:  
```sh
npm start
```

---

## **🔒 Security & Validation**
✔️ **JWT Authentication** for secure user sessions  
✔️ **Role-Based Access** to ensure proper authorization  
✔️ **Input Validation** to prevent bad data entry  

---

## **📢 Contributing**  
We welcome contributions! Feel free to submit a PR or open an issue. 🚀  

---

## **📄 License**  
This project is licensed under the **MIT License**.  

---

🎯 **Cloud Kitchen – Bringing Your Virtual Kitchen to Life!** 🚀🍽️
