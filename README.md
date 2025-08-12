# Credit Card Validator

A modern, responsive web application that validates credit card numbers using Luhn's algorithm. The application features a clean user interface with real-time feedback and card type detection.

## 🚀 Tech Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **Material-UI** - React UI framework for modern design
- **Emotion** - CSS-in-JS styling solution
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend (Optional C++ Implementation)
```cpp
// Luhn's Algorithm in C++
bool luhnCheck(const string& cardNumber) {
    int sum = 0;
    bool isEven = false;
    
    // Iterate from right to left
    for (int i = cardNumber.length() - 1; i >= 0; i--) {
        int digit = cardNumber[i] - '0';
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return (sum % 10 == 0);
}
```

## 🔍 Algorithm Details

### Luhn's Algorithm (Modulus 10 Algorithm)
The Luhn algorithm is a simple checksum formula used to validate various identification numbers, including credit card numbers.

#### Steps:
1. Starting from the rightmost digit, double every second digit
2. If doubling results in a two-digit number, add the digits together
3. Sum all the digits
4. If the total modulo 10 is 0, the number is valid

#### Example:
```
Card Number: 4532 7153 3790 1241
Step 1: Double every second digit from right
        4(10)3(4) 7(2)5(6) 3(14)9(0) 1(4)4(2)
Step 2: Add digits of numbers > 9
        4(1+0)3(4) 7(2)5(6) 3(1+4)9(0) 1(4)4(2)
Step 3: Sum all digits
        4+1+3+4+7+2+5+6+3+5+9+0+1+4+4+2 = 60
Step 4: Check modulo 10
        60 % 10 = 0 → Valid card number
```

## ✨ Features

- Credit card number validation using Luhn's algorithm
- Real-time card type detection (Visa, MasterCard, American Express, Discover)
- Responsive design that works on all devices
- Clean and modern user interface
- Automatic card number formatting
- Immediate validation feedback
- Error handling and user-friendly messages

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/credit-card-validator.git
cd credit-card-validator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser
5. Deployment url: https://credit-card-validator-one.vercel.app/

## 📱 Usage

1. Enter your credit card number in the input field
2. The number will be automatically formatted for better readability
3. Click "Validate Card" to check if the number is valid
4. View the validation result and card type (if valid)

## 🎯 Supported Card Types

- **Visa**: Starts with 4
- **MasterCard**: Starts with 51-55
- **American Express**: Starts with 34 or 37
- **Discover**: Starts with 6

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Build for Production

Create an optimized production build:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Luhn's Algorithm for credit card validation
- Material-UI for the beautiful components
- React community for the amazing ecosystem

## Output
![image](https://github.com/user-attachments/assets/df92fee7-29a2-473c-a0e1-655036522378)
![image](https://github.com/user-attachments/assets/1f17e218-6380-4e0e-bbe6-b75612aa4bb8)
![image](https://github.com/user-attachments/assets/53c86e4f-7041-4ae7-a442-c236fdbccd7d)

