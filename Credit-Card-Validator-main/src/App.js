import EducationalMode from './components/EducationalMode';
import GamifiedValidation from './components/GamifiedValidation';
import CardArtGenerator from './components/CardArtGenerator';
import CardNumberVisualization from './components/CardNumberVisualization';
import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  Alert
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
  const [cardBg, setCardBg] = useState('#1976d2');


  const luhnCheck = (cardNumber) => {
    if (!cardNumber.trim()) return false;
    const numbers = cardNumber.replace(/\D/g, '');
    if (numbers.length < 13 || numbers.length > 19) return false;
    let sum = 0;
    let isEven = false;
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
    if (validationResult) {
      const cleanNumber = cardNumber.replace(/\s/g, '');
      setCardType(getCardType(cleanNumber));
    } else {
      setCardType('');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digitsOnly[i];
    }
    setCardNumber(formatted);
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
    <>
      <ThemeProvider theme={theme}>
        {/* Small fixed card preview on the right */}
        <div style={{
          position: 'fixed',
          top: 32,
          right: 32,
          zIndex: 1000,
          width: 220,
          pointerEvents: 'none',
        }}>
          <CardNumberVisualization
            cardNumber={cardNumber}
            cardBg={cardBg}
            cardType={cardType}
            isValid={isValid}
            small={true}
          />
        </div>
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
                {/* Card Art Generator */}
                <CardArtGenerator onArtChange={setCardBg} />

                {/* Card Number Visualization */}
                <CardNumberVisualization cardNumber={cardNumber} cardBg={cardBg} cardType={cardType} isValid={isValid} />

                {/* Educational Mode */}
                <EducationalMode cardNumber={cardNumber} />

                {/* Main Form */}
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
                  {/* Gamified Validation */}
                  <GamifiedValidation isValid={isValid} />
                </form>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;

