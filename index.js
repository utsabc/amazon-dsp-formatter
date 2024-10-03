const stateMappings = require("./state-mappings");
const addressMappings = require("./address-mappings");

const MAPS = {
  phonePrefixMap: {
    us: "1",
    ca: "1",
    mx: "52",
    gb: "44",
    fr: "33",
    de: "49",
    it: "39",
    es: "34",
    nl: "31",
    in: "91",
    jp: "81",
    au: "61",
    sa: "966",
    ae: "971",
    tr: "90",
    se: "46",
    be: "32",
    pl: "48",
    sg: "65",
  },

  countryMap: {
    canada: "ca",
    france: "fr",
    germany: "de",
    greatbritain: "gb",
    unitedkingdom: "gb",
    italy: "it",
    spain: "es",
    unitedstates: "us",
    unitedstatesofamerica: "us",
    mexico: "mx",
    netherlands: "nl",
    india: "in",
    japan: "jp",
    australia: "au",
    saudiarabia: "sa",
    unitedarabemirates: "ae",
    turkey: "tr",
    sweden: "se",
    belgium: "be",
    poland: "pl",
    singapore: "sg",
  },

  numberMap: {
    número: "number",
    numero: "number",
    no: "number",
    núm: "number",
    num: "number",
  },

  directionMap: {
    east: "e",
    north: "n",
    south: "s",
    west: "w",
    northeast: "ne",
    northwest: "nw",
    southeast: "se",
    southwest: "sw",
  },

  delimiterMap: {
    ",": " ",
    ".": " ",
    "[": " ",
    "]": " ",
    "/": " ",
    "-": " ",
    "#": " number ",
  },

  specialCharacterMap: {
    ß: "ss",
    ä: "ae",
    ö: "oe",
    ü: "ue",
    ø: "o",
    æ: "ae",
  },

  stateMappings,
  addressMappings,
};

class AmazonAdsFormatter {
  constructor(customMaps = {}) {
    this.maps = { ...MAPS, ...customMaps };
  }

  formatPhone(phone, country) {
    if (!phone) return "";

    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, "");

    // Get country prefix
    const prefix = this.maps.phonePrefixMap[country.toLowerCase()];
    if (!prefix) {
      throw new Error(`Invalid country code: ${country}`);
    }

    // Add country prefix if missing
    cleaned = prefix + cleaned;

    return cleaned;
  }

  formatAddress(address, country = "us") {
    if (!address) return "";

    let formatted = address.toLowerCase();

    const countryCode =
      this.maps.countryMap[country.toLowerCase()] || country.toLowerCase();
    const addressMap = this.maps.addressMappings[countryCode];

    const defaultAddressmap = this.maps.addressMappings.default;

    // Apply special character mappings
    Object.entries(this.maps.specialCharacterMap).forEach(
      ([char, replacement]) => {
        formatted = formatted.replace(new RegExp(char, "g"), replacement);
      }
    );

    // Apply delimiter mappings
    Object.entries(this.maps.delimiterMap).forEach(
      ([delimiter, replacement]) => {
        formatted = formatted.replace(
          new RegExp(`\\${delimiter}`, "g"),
          replacement
        );
      }
    );

    // Apply direction mappings
    Object.entries(this.maps.directionMap).forEach(
      ([direction, replacement]) => {
        formatted = formatted.replace(
          new RegExp(`\\b${direction}\\b`, "g"),
          replacement
        );
      }
    );

    // Apply number mappings
    Object.entries(this.maps.numberMap).forEach(([num, replacement]) => {
      formatted = formatted.replace(
        new RegExp(`\\b${num}\\b`, "g"),
        replacement
      );
    });

    // Apply country-specific address mappings
    Object.entries(addressMap).forEach(([word, replacement]) => {
      formatted = formatted.replace(
        new RegExp(`\\b${word}\\b`, "g"),
        replacement
      );
    });

    // Apply default address mappings
    Object.entries(defaultAddressmap).forEach(([word, replacement]) => {
      formatted = formatted.replace(
        new RegExp(`\\b${word}\\b`, "g"),
        replacement
      );
    });

    // Remove all non-alphanumeric characters except spaces
    formatted = formatted.replace(/[^a-z0-9\s]/g, "");

    // Remove leading/trailing whitespace and normalize spaces
    return formatted.trim().replace(/\s+/g, " ");
  }

  formatCountry(country) {
    if (!country) return "";

    const normalized = country.toLowerCase().replace(/[^a-z]/g, "");
    return this.maps.countryMap[normalized] || normalized;
  }

  formatName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

  formatEmail(email) {
    if (!email) return "";

    // Lowercase and remove all non-alphanumeric characters except @ and . and  -
    let formatted = email.toLowerCase().replace(/[^a-z0-9@.-]/g, "");

    // Remove leading/trailing whitespace
    return formatted.trim();
  }

  formatCity(city) {
    if (!city) return "";
    return city
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

  formatState(state, country = "us") {
    if (!state) return "";

    let formatted = state.toLowerCase();

    // Apply state mappings
    const countryCode =
      this.maps.countryMap[country.toLowerCase()] || country.toLowerCase();
    const stateMap = this.maps.stateMappings[countryCode] || {};

    Object.entries(stateMap).forEach(([word, replacement]) => {
      formatted = formatted.replace(
        new RegExp(`\\b${word}\\b`, "g"),
        replacement
      );
    });

    // Apply special character mappings
    Object.entries(this.maps.specialCharacterMap).forEach(
      ([char, replacement]) => {
        formatted = formatted.replace(new RegExp(char, "g"), replacement);
      }
    );

    // Remove all non-alphanumeric characters
    formatted = formatted.replace(/[^a-z0-9]/g, "");

    return formatted.trim();
  }

  formatPostal(postal) {
    if (!postal) return "";

    // Remove all non-alphanumeric characters and trim
    let formatted = postal
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();

    formatted = formatted.replace(/[^a-z0-9]/g, "").trim();
    if (formatted.length > 5) {
      // remove the last 4 characters
      formatted = formatted.slice(0, 5);
    }

    return formatted;
  }

  formatRecord(record) {

    if (!record) return {};

    if (typeof record !== "object") {
      throw new Error("Record must be an object");
    }

    if (!record.country) {
      throw new Error("Country is required");
    }

    const country = this.formatCountry(record.country);

    return {
      phone: record.phone
        ? this.formatPhone(record.phone, country || "us")
        : "",
      address: record.address ? this.formatAddress(record.address) : "",
      firstName: record.firstName ? this.formatName(record.firstName) : "",
      lastName: record.lastName ? this.formatName(record.lastName) : "",
      email: record.email ? this.formatEmail(record.email) : "",
      city: record.city ? this.formatCity(record.city) : "",
      state: record.state ? this.formatState(record.state) : "",
      postal: record.postal ? this.formatPostal(record.postal) : "",
      country,
    };
  }

  formatRecords(records) {
    return records.map((record) => this.formatRecord(record));
  }
}

module.exports = AmazonAdsFormatter;
