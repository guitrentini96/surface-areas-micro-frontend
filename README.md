# Surface Areas Micro Frontend

![Demo](https://i.ibb.co/2yRzhFq/ezgif-2-38cdabcbc7.gif)

Tool that calculates the area of a triangle and a circle.

Built with a micro-frontend pattern using Webpack 5 Module Federation and React.

Database hosted on Supabase.

UI Tools provided by Material UI

## Features

- Visual representation of the geometrical shapes
- Client side validation of the inputs
  - Lets the user know if there aren't enough valid values to calculate the area
  - In the triangle interface, calculates if the measurements make a real triangle
- The axios package ensures safe API calls to the database, with simulated backend congestion of 10 seconds

## Usage

To run _Surface Areas Micro Frontend_ in your local machine:

1. clone
1. cd into it
1. make sure you have npm installed running `npm -v`
   - If not installed, download it thru [this link](https://nodejs.org/en/download/)
1. cd into the circle directory
1. run `npm install` to install all the required packages
1. run `npm start`
1. create another terminal
1. cd into the triangle directory
1. run `npm install` to install all the required packages
1. run `npm start`
1. cd into the host directory
1. run `npm install` to install all the required packages
1. run `npm start`

You will then be able to access the host page at localhost:8080
The triangle page will be at localhost:3000 and the circle page at localhost:3001
