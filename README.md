# Welcome to my Full Stack Uber Clone 👋
<img width="1035" height="301" alt="Screenshot 2026-01-08 193326" src="https://github.com/user-attachments/assets/f2d11576-73ad-4559-b979-3236ba55d75a" />

## 🤖 Introduction

Built with **React Native** for the UI, **Google Maps** for navigation, and **Stripe** for payments, this Uber Clone was developed as a hands-on project to master full-stack mobile development. By building this application, I have strengthened my ability to integrate **complex APIs**, manage serverless **databases with PostgreSQL**, and implement **secure authentication**, ultimately refining my skills in creating scalable, real-world mobile solutions.

---

## ⚙️ Tech Stack

* **React Native**
* **Expo**
* **Stripe**
* **PostgreSQL**
* **Google Maps**
* **Zustand**
* **Clerk**
* **Tailwind CSS**

---

## 🔋 Features

* 👉 **Onboarding Flow**: Seamless user registration and setup process.
* 👉 **Real-time Location**: Integration with Google Maps for precise tracking.
* 👉 **Payment Integration**: Secure transactions powered by Stripe.
* 👉 **Authentication**: Robust user management via Clerk.

* 👉 **Onboarding Flow**: Seamless user registration and setup process.
* 👉 **Email Password Authentication with Verification**: Secure login with email verification.

* 👉 **oAuth Using Google**: Easy login using Google credentials.

* 👉 **Authorization**: Secure access control for different user roles.

* 👉 **Home Screen with Live Location & Google Map**: Real-time location tracking with markers on a map.

* 👉 **Recent Rides**: View a list of recent rides at a glance.

* 👉 **Google Places Autocomplete**: Search any place on Earth with autocomplete suggestions.

* 👉 **Find Rides**: Search for rides by entering 'From' and 'To' locations.

* 👉 **Select Rides from Map**: Choose available cars near your location from the map.

* 👉 **Confirm Ride with Detailed Information**: View complete ride details, including time and fare price.

* 👉 **Pay for Ride Using Stripe**: Make payments using multiple methods like cards and others.

* 👉 **Create Rides After Successful Payment**: Book a ride after confirming payment.

* 👉 **Profile**: Manage account details in the profile screen.

* 👉 **History**: Review all rides booked so far.

* 👉 **Responsive on Android and iOS**: Optimized for both Android and iOS devices.

and many more, including code architecture and reusability

---

## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository

```bash
git clone [https://github.com/AyaNour333/Uber.git](https://github.com/AyaNour333/Uber.git)
cd Uber
```

### Installation

Install the project dependencies using npm:

```bash
   npm install
```

### Set Up Environment Variables

Create a new file named .env in the root of your project and add the following content:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=

EXPO_PUBLIC_PLACES_API_KEY=
EXPO_PUBLIC_DIRECTIONS_API_KEY=

DATABASE_URL=

EXPO_PUBLIC_SERVER_URL=https://uber.dev/

EXPO_PUBLIC_GEOAPIFY_API_KEY=

EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```
Replace the placeholder values with your actual Clerk, Stripe, NeonDB, Google Maps, andgeoapify credentials. You 
can obtain these credentials by signing up on the [Clerk](https://clerk.com/), [Stripe](https://stripe.com/in), [NeonDB](https://neon.com/), [Google Maps](https://console.cloud.google.com/welcome/new?project=ryde-482208) and [geoapify](https://www.geoapify.com/) websites respectively.

### Running the Project

   ```bash
   npx expo start
   ```


