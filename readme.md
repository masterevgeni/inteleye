# Personal Music Library Dashboard

This is a full-stack project created as a home assignment. It features a dashboard for visualizing and analyzing a personal music library by using Polling, built with NestJS, React 19 Typescript, and MongoDB.

The main goal is to showcase the ability to build a complete end-to-end feature, with a strong focus on data-driven insights, clean code, and a high-quality responsive UI/UX.

![Dashboard Screenshot](https://github.com/masterevgeni/inteleye/Screenshot1.png)
![Dashboard Screenshot](https://github.com/masterevgeni/inteleye/Screenshot2.png)
![Dashboard Video](https://youtu.be/L6WUqkiHPp8)

---

## 🎵 The Theme: Music Insights

I chose the thene of a music  because it allows for a variety of interesting and visually appealing data insights. 
The dashboard analyzes a simulated personal music collection and provides answers to questions like:

*   "What are the key stats of my collection?"
*   "What song did I listen to most recently?"
*   "List of all songs with"
*   "What is the overall breakdown of my musical taste?"
*   "Who are my most-listened-to artists?"
*   "Which musical eras are most represented in my library?"

### The Insights (The Story)

The dashboard is designed to tell a story about the user's listening habits:

1.  **Key Metrics (KPIs):** At a glance, the user sees the scale of their collection: **Total Songs**, **Unique Artists**, and the **Average Song Length**.
2.  **Now Playing:** This card provides an immediate, "live" feel to the dashboard. It shows the most recently played song and serves as the primary visual demonstration for the `polling` mechanism.
3.  **Genre Distribution:** A doughnut chart gives a quick, colorful overview of the user's primary musical tastes.
4.  **Top 5 Artists:** A horizontal bar chart clearly highlights the artists the user has invested the most time in, showing loyalty and preference.
5.  **Music by Decade:** A bar chart visualizes the collection's distribution across different musical eras (e.g., 1970s, 1990s, 2010s), revealing if the user has a preference for modern, classic, or vintage music.

---

## 🛠️ Tech Stack

*   **Backend:**
    *   [NestJS](https://nestjs.com/) (Node.js Framework)
    *   [Mongoose](https://mongoosejs.com/) (MongoDB ODM)
    *   TypeScript
*   **Frontend:**
    *   [React](https://reactjs.org/) (with Vite)
    *   [MUI (Material-UI)](https://mui.com/) for UI components.
    *   [TanStack Query (React Query)](https://tanstack.com/query/latest) for data fetching, caching, and polling.
    *   [Recharts](https://recharts.org/) for data visualization.
    *   TypeScript
*   **Database:**
    *   [MongoDB](https://www.mongodb.com/)
*   **Deployment & Tooling:**
    *   [Docker](https://www.docker.com/) & Docker Compose for easy database setup.

---

## 🚀 Getting Started (Clear Execution Instructions)

Follow these instructions to get the project running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later is recommended)
*   [Docker](https://www.docker.com/) and Docker Compose

### 1. Clone the Repository

<!-- ```bash -->
1. Clone the Repository
git clone https://github.com/masterevgeni/inteleye.git
cd inteleye

2. Set user, pwd, db, getSiblingDB in mongo-init.js for set net user in db
* be careful, do not save it in git folder
this file runs by docker composer and it add specific new user to db for safe connection from server side

3. SetUP global env file in root folder with next params:
```bash
DB_USER_FOR_CODE_CONNECT=<SET YOUR>
DB_PASSWORD_FOR_CODE_CONNECT=<SET YOUR>
DB_NAME_FOR_CODE_CONNECT=inteleye

MONGODB_URI=mongodb://<USER EXACTLY FROM MONGO INIT FILE>:<PASSWORDEXACTLY FROM MONGO INIT FILE>@mongodb:27017/inteleye

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=<SET YOUR>
MONGO_INITDB_DATABASE=inteleye

ME_CONFIG_MONGODB_ADMINUSERNAME=<SET YOUR> //for docker configuration
ME_CONFIG_MONGODB_ADMINPASSWORD=<SET YOUR> //for docker configuration
ME_CONFIG_MONGODB_URL=mongodb://<ME_CONFIG_MONGODB_ADMINUSERNAME>:<ME_CONFIG_MONGODB_ADMINPASSWORD>@mongodb:27017/ //for docker configuration

ME_CONFIG_BASICAUTH_USERNAME=<SET YOUR> //for docker configuration
ME_CONFIG_BASICAUTH_PASSWORD=<SET YOUR>  //for docker configuration

SERVER_PORT=4000 // sdefault erver port  fro this project, you can change it, synchronyze with client
client_PORT=3000
```

4. SetUP env file for server side in /server folder
```bash
SERVER_PORT=4000 // sdefault erver port  fro this project, you can change it, synchronyze with client
allowed_origins='0.0.0.0' // this is global acess from any origin, you can leave it for testing and develop, or config it to real/prodaction server
MONGODB_URI=mongodb://<DB_USER_FOR_CODE_CONNECT>:<DB_PASSWORD_FOR_CODE_CONNECT>@mongodb:27017/inteleye //pay attention you should use here variables from env in root folder
AUTH_SOURCE=inteleye
MAX_RATE_LiMIT=1000 // you can change it for 

```

5. Start and Use the project.
* command for linux users -> sudo docker compose up --build
* command for mac users -> sudo docker-compose up --build

This command will start a MongoDB as data base, nestJS as server side, reactJS as client side, and mongo-express as mongo viewer.
After docker up, you can start use this application.

* open browser and go to this url: http://localhost:3000/

🔄 Demonstrating Data Updates (Polling)
The dashboard is configured to automatically refetch data from the backend every 5 seconds using TanStack Query's polling feature.

To demonstrate this mechanism:
Open the dashboard in your browser. Go to URL: http://localhost:3000/. Take note of the song displayed in the "Now Playing" card.

To change song, press on "play random song". IT WILL NOT RETURN TO BROWSER NRE SONG, BECAUSE THE MAIN IDEA OF PROJECT IT'S SHOW POLLING SOLUTION, client side will run query each 5 seconds for update data.

* you can change it in code to any timeout but pay attention to ratelimit in server side.


* Given more time: possible add Authorization( like API key) for requests, swagger, test, config files for clinet, and many more.
