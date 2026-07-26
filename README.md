# 🚐 TravelTrucks

> Modern web application for browsing, filtering, and booking camper trucks for outdoor adventures and road trips.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-Scoped-000000?style=for-the-badge&logo=css3)

---

## 📖 Overview

**TravelTrucks** provides an intuitive and seamless platform for users to find their perfect campervan. The application allows users to explore a full catalog of vehicles, apply granular multi-criteria filters, review detailed specs and user feedback, and submit booking requests instantly.

---

## ✨ Features

* **🚐 Camper Catalog:** Browse available campers with seamless infinite pagination and smooth loading states.
* **🔍 Advanced Search & Filtering:** Filter vehicles by:
  * **Location**
  * **Vehicle Type:** Alcove, Panel Van, Integrated, Semi-integrated.
  * **Transmission:** Automatic, Manual.
  * **Engine Type:** Diesel, Petrol, Hybrid, Electric.
  * **Equipment/Amenities:** AC, Bathroom, Kitchen, TV, Radio, etc.
* **📄 Detailed Camper Profiles:** View complete technical specifications, interactive photo galleries, and authentic user reviews.
* **🖼️ Interactive Image Gallery:** Fully responsive slider with thumbnail navigation powered by **Swiper.js**.
* **📝 Interactive Booking Form:** Instant form validation (Formik + Yup) with real-time visual feedback and toast notifications.

---

## 🛠️ Tech Stack

### **Core**
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Library:** [React](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)

### **State & Data Fetching**
* **Data Fetching & Caching:** [TanStack Query v5](https://tanstack.com/query)
* **HTTP Client:** [Axios](https://axios-http.com/)

### **Forms & UI Elements**
* **Form Management:** [Formik](https://formik.org/)
* **Schema Validation:** [Yup](https://github.com/jquense/yup)
* **Sliders & Galleries:** [Swiper.js](https://swiperjs.com/)
* **Notifications:** [react-hot-toast](https://react-hot-toast.com/)

### **Styling**
* **Styles:** CSS Modules (BEM-inspired, scoped styles)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### **Prerequisites**

Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed.

### **Installation**

1. **Clone the repository:**

git clone [https://github.com/eugeneprygaro/traveltrucks.git](https://github.com/eugeneprygaro/traveltrucks.git)
   cd traveltrucks
   
2. **Install dependencies:**

npm install

3. **Configure Environment Variables:**

Create a .env file in the root directory and add your API base URL:

NEXT_PUBLIC_API_URL=[https://your-api-url.com](https://your-api-url.com)

4. **Run the development server:**

npm run dev

5. **Open in Browser:**

Go to http://localhost:3000 to see the application live.
