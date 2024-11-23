
import { agriData } from "./data";

// Define the structure of the data
interface AgriData {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string; // Allow both string and number
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number | string; // Optional, allow both
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number | string; // Optional, allow both
}

// Define the structure of the result
interface MaxMinCrop {
  Year: string;
  CropWithMaxProduction: string | null; // Null for cases with no data
  CropWithMinProduction: string | null; // Null for cases with no data
}

export const calculateMaxMinCrop = (): MaxMinCrop[] => {
  const data: AgriData[] = agriData;

  // Group data by year
  const groupedByYear = data.reduce<Record<string, AgriData[]>>((acc, curr) => {
    // Extract the year from the "Year" field
    const year = curr.Year.split(",").pop()?.trim() || "";

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(curr);
    return acc;
  }, {});

  // Calculate max and min crop for each year
  const maxMinCrops: MaxMinCrop[] = Object.keys(groupedByYear).map((year) => {
    const yearData = groupedByYear[year];

    const maxCrop = yearData.reduce((prev, curr) => {
      const prevProduction = parseFloat(prev["Crop Production (UOM:t(Tonnes))"] as string) || 0; // Parse string to number
      const currProduction = parseFloat(curr["Crop Production (UOM:t(Tonnes))"] as string) || 0; // Parse string to number
      return prevProduction > currProduction ? prev : curr;
    }, {} as AgriData);

    const minCrop = yearData.reduce((prev, curr) => {
      const prevProduction = parseFloat(prev["Crop Production (UOM:t(Tonnes))"] as string) || Infinity; // Parse string to number
      const currProduction = parseFloat(curr["Crop Production (UOM:t(Tonnes))"] as string) || Infinity; // Parse string to number
      return prevProduction < currProduction ? prev : curr;
    }, {} as AgriData);

    return {
      Year: year,
      CropWithMaxProduction: maxCrop["Crop Name"] || null,
      CropWithMinProduction: minCrop["Crop Name"] || null,
    };
  });

  return maxMinCrops;
};
