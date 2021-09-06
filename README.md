<img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1630207818/images/logoTD.svg_bpuqda.png">**TusStore**

# I. Overview
TusStore is an e-commerce website specializing in selling desktop plants. This is a front-end project for TusStore.

# II. Technologies
- Architecture: MVC
- Front-end:
    - React
- Back-end:
    - Node.js
    - Express.js
    - MongoDB-moongoose
    
# III. Tools
- Visual Studio Code
- PasreHub (to crawl data)
- Hackolade (to design database)

# IV. Features
- Homepage with hot products and newest products
- Display product list by category with pagination
- Advanced filtering
    - Cactus: Done
    - Stone lotus: Doing (UI)
    - Pots: Doing (UI)
- Sort by:
    - Newest
    - Most viewst
    - High rated
    - Ascending price
    - Descending price

# V. Installation
You need more install [TusStore-BackEnd](https://github.com/huynhduc43/TusStore-BackEnd.git) project.

## Prerequisits
- node (v14.15.0)
- git

## Setup

### Front-end
```
git clone https://github.com/huynhduc43/TusStore-FrontEnd.git
cd TusStore-FrontEnd
npm install
```

### Back-end
```
git clone https://github.com/huynhduc43/TusStore-BackEnd.git
cd TusStore-BackEnd
npm install
```

### Database
Add data from *plants.csv* and *pots.csv* to MongoDB.
Add .env file and configure database connection.
```
DB='mongodb://localhost:27017/TusStoreDB'
```

## Run
Run front-end server. By default, a server at localhost:3000 is started.
```
npm start
```
Run back-end server. By default, a server at localhost:3001 is started.
```
npm start
```

# VI. Resources
- Icons, images: 
    - [Freepik](https://www.freepik.com)
    - [Kiranshastry](https://www.flaticon.com/authors/kiranshastry)
    - [mashicons](https://smashicons.com/)
    - [Flaticon](https://www.flaticon.com/)
- Youtube:
    - [React Shopping Cart Tutorial | Context API with useReducer Hook in React JS](https://www.youtube.com/watch?v=HptuMAUaNGk&t=2581s)
