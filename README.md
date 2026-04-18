 # Space Mission Countdown Dashboard

A web-based interactive dashboard that simulates a space mission launch sequence. Users log in as a Commander and gain access to a countdown control panel with real-time tracking, theming options, and countdown controls.

## Screenshots

<div align="center">
  <img src="imgs/form.png" alt="Mission Validation Form" width="45%">
  &nbsp;
  <img src="imgs/dashboard.png" alt="Main Launch Dashboard" width="45%">
</div>

## Features

- **Mission Validation Form:** A simple pre-launch access screen that validates the Mission Name and Commander Name before granting access to the dashboard.
- **Main Launch Dashboard:**
  - **Commander Welcome:** Dynamically displays the commander's name upon successful validation.
  - **Live Clock:** Shows the real-time system clock using asynchronous JavaScript (`setInterval`).
  - **Launch Countdown Tracker:** A high-precision countdown timer tracking minutes, seconds, and milliseconds until liftoff.
  - **Launch Controls:** Let the user interact with the countdown:
    - **Start Sequence:** Initiates the launch countdown.
    - **Abort:** Pauses the countdown and triggers a mission abort warning.
    - **Reset:** Resets the countdown timer to its initial state.
- **Dark/Light Mode Theme Toggle:** Allows the user to switch between light and dark themes using CSS variables and DOM manipulation.

## Project Structure

- `index.html`: The main HTML document, containing both the validation form and the launch dashboard interfaces.
- `style.css`: The stylesheet containing all layout, aesthetics, and CSS variables for light/dark theming.
- `script.js`: The JavaScript logic handling form validation, dashboard state transitions, live clock updates, high-precision countdown tracking, and theme toggling.

## How to Run

1. Clone or download this project to your local machine.
2. Open the `index.html` file in any modern web browser.
3. Enter a **Mission Name** and **Commander Name** to initiate the login sequence.
4. Use the **Start**, **Abort**, and **Reset** controls to manage the mission launch. 
5. Toggle the light/dark theme using the floating action button at the bottom of the screen.
