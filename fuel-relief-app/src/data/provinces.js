// Province plate patterns are illustrative placeholders for this demo build.
// Before production use, replace `pattern` with regexes verified against real
// registration documents for each province.
export const PROVINCES = [
  {
    id: "punjab",
    nameKey: "guide.provinces.punjab.name",
    // e.g. LEA-21-1234 : 2-3 letters, dash, 2 digits, dash, up to 4 digits
    pattern: /^[A-Z]{2,3}-\d{2}-\d{1,4}$/,
    example: "LEA-21-1234",
  },
  {
    id: "sindh",
    nameKey: "guide.provinces.sindh.name",
    // e.g. KHI-2021-A1
    pattern: /^[A-Z]{2,3}-\d{4}-[A-Z]\d{1,2}$/,
    example: "KHI-2021-A1",
  },
  {
    id: "kpk",
    nameKey: "guide.provinces.kpk.name",
    // e.g. PE-4521
    pattern: /^[A-Z]{2}-\d{3,5}$/,
    example: "PE-4521",
  },
  {
    id: "balochistan",
    nameKey: "guide.provinces.balochistan.name",
    // e.g. BA-7788
    pattern: /^[A-Z]{2}-\d{3,5}$/,
    example: "BA-7788",
  },
  {
    id: "islamabad",
    nameKey: "guide.provinces.islamabad.name",
    // e.g. ICT-9981
    pattern: /^ICT-\d{3,5}$/,
    example: "ICT-9981",
  },
];

export function getProvince(id) {
  return PROVINCES.find((p) => p.id === id);
}
