// Illustrative placeholder rules — replace with the real published eligibility
// criteria before production use. Each rule matches a vehicleType, an engine
// capacity range (inclusive), and either a specific province or "any".
export const ELIGIBILITY_RULES = [
  { vehicleType: "motorcycle", minCc: 0, maxCc: 150, province: "any", outcome: "eligible" },
  { vehicleType: "motorcycle", minCc: 151, maxCc: 1000, province: "any", outcome: "undetermined" },
  { vehicleType: "rickshaw", minCc: 0, maxCc: 250, province: "any", outcome: "eligible" },
  { vehicleType: "car", minCc: 0, maxCc: 1000, province: "any", outcome: "eligible" },
  { vehicleType: "car", minCc: 1001, maxCc: 1300, province: "any", outcome: "undetermined" },
  { vehicleType: "car", minCc: 1301, maxCc: 9000, province: "any", outcome: "notEligible" },
  { vehicleType: "van", minCc: 0, maxCc: 1500, province: "any", outcome: "undetermined" },
];

export function evaluateEligibility({ vehicleType, engineCapacityCc, province }) {
  const cc = Number(engineCapacityCc);
  const match = ELIGIBILITY_RULES.find((r) => {
    const provinceOk = r.province === "any" || r.province === province;
    return r.vehicleType === vehicleType && provinceOk && cc >= r.minCc && cc <= r.maxCc;
  });
  return match ? match.outcome : "undetermined";
}

export const VEHICLE_TYPES = [
  { id: "motorcycle", labelKey: "eligibility.vehicleTypes.motorcycle" },
  { id: "car", labelKey: "eligibility.vehicleTypes.car" },
  { id: "rickshaw", labelKey: "eligibility.vehicleTypes.rickshaw" },
  { id: "van", labelKey: "eligibility.vehicleTypes.van" },
];
