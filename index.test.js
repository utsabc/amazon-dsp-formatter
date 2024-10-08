const AmazonAdsFormatter = require("./index");

describe("AmazonAdsFormatter", () => {
  let formatter;

  beforeEach(() => {
    formatter = new AmazonAdsFormatter();
  });

  describe("formatPhone", () => {
    it("should return an empty string for undefined phone", () => {
      expect(formatter.formatPhone(undefined, "us")).toBe("");
    });

    it("should return an empty string for null phone", () => {
      expect(formatter.formatPhone(null, "us")).toBe("");
    });

    it("should throw an error for unsupported country code", () => {
      expect(() => formatter.formatPhone("1234567890", "unsupported")).toThrow(
        "Invalid country code: unsupported"
      );
    });
  });

  describe("formatAddress", () => {
    it("should return an empty string for undefined address", () => {
      expect(formatter.formatAddress(undefined)).toBe("");
    });

    it("should return an empty string for null address", () => {
      expect(formatter.formatAddress(null)).toBe("");
    });

    it("should handle addresses with special characters", () => {
      expect(formatter.formatAddress("123 Main St. Apt #5")).toBe(
        "123 main st apt number 5"
      );
    });

    it("should handle addresses with multiple spaces", () => {
      expect(formatter.formatAddress("   123   Main   St.   ")).toBe(
        "123 main st"
      );
    });

    it("should hanlde addresses with values from addressMappings", () => {
      expect(formatter.formatAddress("123 Main Street.", "uk")).toBe(
        "123 main st"
      );
    });
  });

  describe("formatCountry", () => {
    it("should format countries correctly", () => {
      expect(formatter.formatCountry("United States")).toBe("us");
      expect(formatter.formatCountry("CANADA")).toBe("ca");
      expect(formatter.formatCountry("United Kingdom")).toBe("gb");
    });
  });

  describe("formatEmail", () => {
    it("should format email addresses correctly", () => {
      expect(formatter.formatEmail("Test.User@Example.com")).toBe(
        "test.user@example.com"
      );
    });

    it("should handle email addresses with special characters", () => {
      expect(formatter.formatEmail("info@Bücher.de")).toBe("info@bcher.de");
    });

    it("should handle email addresses with dots and dashes", () => {
      expect(formatter.formatEmail("desmon-miles@test.com")).toBe(
        "desmon-miles@test.com"
      );
    });
  });

  describe("formatPostal", () => {
    it("should format postal codes correctly", () => {
      expect(formatter.formatPostal("12345-6789")).toBe("12345");
      expect(formatter.formatPostal("K1A 0B1")).toBe("k1");
      expect(formatter.formatPostal("K1A")).toBe("");
    });
  });

  describe("formatRecord", () => {
    it("should format a complete record correctly", () => {
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

      const formatted = formatter.formatRecord(record);

      expect(formatted).toEqual({
        phone: "11234567890",
        address: "123 e main st",
        country: "us",
        firstName: "john",
        lastName: "doe",
        email: "john.doe@example.com",
        city: "newyork",
        state: "ny",
        postal: "12345",
      });
    });
  });
});
