# Weather Measure

The purpose of this web app is to check the weather of cities.

## Motivation

I wanted to try my hand at making a really fun design for a website, and I wanted to make a weather app where I could do more than just look up locations. For the design of this app, I tried to follow the neobrutalist style. As for the functionality, I wanted users to be able to save the locations that they've looked up and get their location with the press of a button.

I was able to save cities by using a combination of a global state and localstorage. The cities are saved in localstorage, and the global state watches for changes in localstorage to update the DOM. To get the location of a user, I used the Geolocation API that's native to javascript. Whatever latitude and longitude I recieved was sent to the OpenWeather API to get the weather for that location.

## Challenges

One of the biggest challenges involved saving the cities. I had to get the information I had in localstorage to match the inormation on the DOM. Originally, I had two arrays that I needed to update: one for the DOM and one for localstorage. I realized I was doing more work than I needed, so I decided to make a file that would watch the state of localstorage. This way I only had to check and update one array instead of two.

The second biggest challenge was with the back-end. I needed to create a back-end to hide my API keys and make the requests to the APIs I was using. I had an idea of how my back-end would look and funciton, but I had never used Node.js or Express.js. I basically had to learn them from the ground up. After making this project, I definitley feel more comfortable using them.
(and I definitely won't ever publish my API keys on gitHub again)

## Project Setup

```sh
npm install axios
```

```sh
npm install cors
```

```sh
npm install dotenv
```

```sh
npm install express
```

```sh
npm install nodemon
```
