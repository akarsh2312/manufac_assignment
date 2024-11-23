import { agriData } from "./data";

// Define the structure of the data
interface AgriData {
  "Crop Name": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number; // Allow both string and number
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number; // Allow both string and number
}

// Define the structure of the result
interface CropStatistics {
  CropName: string;
  AverageYield: string; // String because of `.toFixed()`
  AverageCultivationArea: string; // String because of `.toFixed()`
}

export const getAvgYieldAndCultivation = (): CropStatistics[] => {
  // Group data by crop
  const groupedByCrop = agriData.reduce<Record<string, AgriData[]>>((acc, curr) => {
    const cropName = curr["Crop Name"];

    if (!acc[cropName]) {
      acc[cropName] = [];
    }

    acc[cropName].push(curr);
    return acc;
  }, {});

  // Calculate average yield and average cultivation area for each crop
  const cropStatistics: CropStatistics[] = Object.keys(groupedByCrop).map((cropName) => {
    const cropData = groupedByCrop[cropName];

    // Calculate sum of yields
    const yieldSum = cropData.reduce((sum, item) => {
      const yieldValue = item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
      // Parse the yield value, default to 0 if it's invalid
      const validYield = yieldValue && !isNaN(parseFloat(yieldValue as string)) 
        ? parseFloat(yieldValue as string) 
        : 0;
      return sum + validYield;
    }, 0);

    // Calculate sum of areas
    const areaSum = cropData.reduce((sum, item) => {
      const areaValue = item["Area Under Cultivation (UOM:Ha(Hectares))"];
      // Parse the area value, default to 0 if it's invalid
      const validArea = areaValue && !isNaN(parseFloat(areaValue as string)) 
        ? parseFloat(areaValue as string) 
        : 0;
      return sum + validArea;
    }, 0);

    const totalYears = cropData.length;

    // Return the statistics for this crop
    return {
      CropName: cropName,
      AverageYield: (yieldSum / totalYears).toFixed(3), // Fixed to 3 decimal places
      AverageCultivationArea: (areaSum / totalYears).toFixed(3), // Fixed to 3 decimal places
    };
  });

  return cropStatistics;
};
