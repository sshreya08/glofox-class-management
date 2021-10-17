# glofox-class-management

Installation
1. npm install

Start
npm run start

Currently serving on 5000 port, settings in .env file.


Exposed APIs

1. http://localhost:5000/classes - POST 
     payload expected in format: {"className": string, "startDate": string, "endDate": string, "capacity": string}
     eg: {"className": "zumba", "startDate": "2021/10/4", "endDate": "2021/10/5", "capacity": "20"}



2. http://localhost:5000/classes - GET 


3. http://localhost:5000/bookings - POST

    payload expected in format: {"className": string, "date": string}
    eg: {"className": "zumba", "date": "2021/10/4"}
