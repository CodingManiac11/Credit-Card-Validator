# Credit Card Validator

A modern, responsive web application that validates credit card numbers using Luhn's algorithm. The application features a clean user interface with real-time feedback and card type detection.

## Features

- Credit card number validation using Luhn's algorithm
- Real-time card type detection (Visa, MasterCard, American Express, Discover)
- Responsive design that works on all devices
- Clean and modern user interface
- Automatic card number formatting
- Immediate validation feedback

## Technologies Used

- React
- Material-UI
- JavaScript (ES6+)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

The application implements the Luhn algorithm to validate credit card numbers. This algorithm, also known as the "modulus 10" algorithm, is used to validate various identification numbers, including credit card numbers.

### Luhn Algorithm Steps:
1. Double every second digit from the right
2. If doubling results in a two-digit number, add those digits together
3. Add all digits together
4. If the total is divisible by 10, the number is valid

## Usage

1. Enter your credit card number in the input field
2. The number will be automatically formatted for better readability
3. The card type will be detected and displayed as you type
4. Click "Validate Card" to check if the number is valid
5. A success or error message will appear with the validation result

## Output
![image](https://github.com/user-attachments/assets/df92fee7-29a2-473c-a0e1-655036522378)
![image](https://github.com/user-attachments/assets/1f17e218-6380-4e0e-bbe6-b75612aa4bb8)
![image](https://github.com/user-attachments/assets/53c86e4f-7041-4ae7-a442-c236fdbccd7d)

