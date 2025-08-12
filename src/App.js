import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [cardType, setCardType] = useState('');

  const luhnCheck = (cardNumber) => {
    if (!cardNumber.trim()) return false;

    const numbers = cardNumber.replace(/\D/g, '');
    if (numbers.length < 13 || numbers.length > 19) return false;

    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost digit
    for (let i = numbers.length - 1; i >= 0; i--) {
      let digit = parseInt(numbers.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = luhnCheck(cardNumber);
    setIsValid(validationResult);
    
    // Set card type only if validation passes
    if (validationResult) {
      const cleanNumber = cardNumber.replace(/\s/g, '');
      setCardType(getCardType(cleanNumber));
    } else {
      setCardType('');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    
    // Format with spaces after every 4 digits
    let formatted = '';
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digitsOnly[i];
    }
    
    setCardNumber(formatted);
    
    // Reset validation state when input changes
    setIsValid(null);
    setCardType('');
  };

  const getCardType = (number) => {
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.substring(0, 2);
    
    if (firstDigit === '4') return 'Visa';
    if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'MasterCard';
    if (['34', '37'].includes(firstTwoDigits)) return 'American Express';
    if (firstDigit === '6') return 'Discover';
    return 'Unknown';
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Card
            elevation={3}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                }}
              >
                Credit Card Validator
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Enter Credit Card Number"
                  variant="outlined"
                  value={cardNumber}
                  onChange={handleInputChange}
                  margin="normal"
                  placeholder="XXXX XXXX XXXX XXXX"
                  inputProps={{
                    maxLength: 24, // Allow for 19 digits + 4 spaces
                  }}
                  sx={{ mb: 2 }}
                  error={isValid === false}
                  helperText={isValid === false ? "Invalid card number" : ""}
                />
                {isValid === true && cardType && (
                  <Typography
                    variant="subtitle1"
                    sx={{ 
                      mb: 2, 
                      color: theme.palette.text.secondary,
                      fontWeight: 'bold',
                    }}
                  >
                    Card Type: {cardType}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mb: 2 }}
                  disabled={!cardNumber.trim()}
                >
                  Validate Card
                </Button>
                {isValid !== null && (
                  <Alert
                    severity={isValid ? "success" : "error"}
                    sx={{
                      mt: 2,
                      animation: 'fadeIn 0.5s ease-in',
                      '@keyframes fadeIn': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(-10px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    }}
                  >
                    {isValid
                      ? "Valid credit card number!"
                      : "Invalid credit card number. Please check and try again."}
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 