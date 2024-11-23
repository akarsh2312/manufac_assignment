import './App.css';
import { Table, Title } from '@mantine/core';
import { calculateMaxMinCrop } from './utils/calculateMaxMinCrop';
import { getAvgYieldAndCultivation } from './utils/getAvgYieldAndCultivation';
import React from 'react';

// Define interfaces for data
interface MaxMinCrop {
  Year: string;
  CropWithMaxProduction: string | null;
  CropWithMinProduction: string | null;
}

interface AvgYieldCultivation {
  CropName: string;
  AverageYield: string;
  AverageCultivationArea: string;
}

function App() {
  // Type-safe usage of functions
  const maxMinCrops = calculateMaxMinCrop().map((cropData: MaxMinCrop) => (
    <tr key={cropData.Year}>
      <td>{cropData.Year}</td>
      <td>{cropData.CropWithMaxProduction ?? 'N/A'}</td> {/* Handling null */}
      <td>{cropData.CropWithMinProduction ?? 'N/A'}</td> {/* Handling null */}
    </tr>
  ));

  const avgYieldAndCultivation = getAvgYieldAndCultivation().map((cropData: AvgYieldCultivation) => (
    <tr key={cropData.CropName}>
      <td>{cropData.CropName}</td>
      <td>{cropData.AverageYield}</td>
      <td>{cropData.AverageCultivationArea}</td>
    </tr>
  ));

  return (
    <>
      <Title order={1} className='title--maxmincrop'>
        Crops with maximum and minimum production between the year 1950-2020
      </Title>
      <Table striped highlightOnHover withRowBorders withColumnBorders id='Crop--maxProd--minProd'>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production in that Year</th>
            <th>Crop with Minimum Production in that Year</th>
          </tr>
        </thead>
        <tbody>{maxMinCrops}</tbody>
      </Table>

      <Title order={1} className='title--avgyield'>
        Average Yield and Cultivation of Crop between the year 1950-2020
      </Title>
      <Table striped highlightOnHover withRowBorders withColumnBorders id="Crop--avgYield">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield of the Crop between 1950-2020</th>
            <th>Average Cultivation Area of the Crop between 1950-2020</th>
          </tr>
        </thead>
        <tbody>{avgYieldAndCultivation}</tbody>
      </Table>
    </>
  );
}

export default App;
