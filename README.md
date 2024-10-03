# Amazon DSP Formatter

## Overview

The Amazon DSP Formatter is a Node.js module designed to format customer data according to Amazon Ads Audience requirements. This comprehensive formatting tool handles various normalization rules, ensuring that customer data is consistent and compliant with Amazon's advertising standards.

## Features

- Format phone numbers with country codes.
- Normalize addresses using predefined mappings.
- Convert country names to their respective codes.
- Format email addresses to a standard format.
- Handle postal codes according to regional specifications.
- Format complete customer records in a structured manner.

## Installation

To install the Amazon DSP Formatter, use npm:

```bash
npm install amazon-dsp-formatter
```

## Usage

### Importing the Library

To use the formatter in your project, import it as follows:

```javascript
const AmazonAdsFormatter = require("amazon-dsp-formatter");
```

### Formatting Phone Numbers

You can format phone numbers by providing the phone number and the country code:

```javascript
const formatter = new AmazonAdsFormatter();
const formattedPhone = formatter.formatPhone("(123) 456-7890", "us");
console.log(formattedPhone); // Output: "11234567890"
```

### Formatting Addresses

Addresses can be formatted using the `formatAddress` method:

```javascript
const formattedAddress = formatter.formatAddress("123 Main St. Apt #5", "us");
console.log(formattedAddress); // Output: "123 main st apt number 5"
```

### Formatting Countries

To convert country names to their respective codes:

```javascript
const countryCode = formatter.formatCountry("United States");
console.log(countryCode); // Output: "us"
```

### Formatting Email Addresses

Email addresses can be standardized as follows:

```javascript
const formattedEmail = formatter.formatEmail("Test.User@Example.com");
console.log(formattedEmail); // Output: "test.user@example.com"
```

### Formatting Postal Codes

Postal codes can be formatted using:

```javascript
const formattedPostal = formatter.formatPostal("K1A 0B1");
console.log(formattedPostal); // Output: "k1a0b"
```

### Formatting Complete Records

You can format a complete customer record with all necessary fields:

```javascript
const record = {
  phone: "(123) 456-7890",
  address: "123 East Main St.",
  country: "United States",
  firstName: "John",
  lastName: "Doe",
  email: "John.Doe@example.com",
  city: "New York",
  state: "NY",
  postal: "12345-6789",
};

const formattedRecord = formatter.formatRecord(record);
console.log(formattedRecord);
```

## Testing

To run the tests for this library, ensure you have Jest installed and run:

```bash
npm test
```

## Documentation

For more detailed information on Amazon Ads Audience requirements, please refer to the official documentation: [Amazon Ads Audience Documentation](https://advertising.amazon.co.uk/help/GCCXMZYCK4RXWS6C).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.