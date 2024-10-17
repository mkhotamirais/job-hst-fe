# How to run this project
This project was created to fulfill the as signment from Company Summit HABIB for smart technology. 

## Prerequisite
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- Project uses [TypeScript](https://www.typescriptlang.org/), which will be installed with dependencies.
- **Running the server-side**: Please make sure to clone and set up the backend repository by following the instructions in [job-hst-be](https://github.com/mkhotamirais/job-hst-be).


## Installation
1. **Clone the repository**   
Clone the project to your local machine by running:

  ```bash
  git clone https://github.com/mkhotamirais/job-hst-fe.git
  ```
2. **Navigate into the project direction**  
After cloning, navigate to the project folder:

  ```
  cd job-hst-fe
  ```
3. **Install dependencies**   
Install the required packages using npm:
  ```
  npm install
  ```

## Add the .env file
Create .env file at the root of the project. Add the following configuration setting:

  ```
  VITE_URL_DEV="http://localhost:5000"
  VITE_URL_PROD="https://job-hst-be.vercel.app"
  ```

## Running the development server   
To start the development server, run the following command:

  ```
  npm run dev
  ```
The project should now be running at:

  ```
  http://localhost:5173
  ```
