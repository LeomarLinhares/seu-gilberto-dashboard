import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaFutbol } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Registra os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dados de exemplo para a classificação dos usuários
const currentRankingData = [
  { name: 'Alice', score: 120, change: 'up' },
  { name: 'Bob', score: 115, change: 'down' },
  { name: 'Charlie', score: 110, change: 'up' },
];

// Componente para a tabela de classificação
const RankingTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
              Usuário
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
              Pontuação
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {currentRankingData.map((player, index) => (
            <tr key={index}>
              <td className="px-4 py-3 text-gray-700">{player.name}</td>
              <td className="px-4 py-3 font-bold text-gray-700">{player.score}</td>
              <td className="px-4 py-3 flex items-center justify-end">
                {player.change === 'up' ? (
                  <div className="flex items-center">
                    <ChevronUp className="text-green-600 mr-1" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ChevronDown className="text-red-600 mr-1" />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RankingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full mx-auto p-8 z-10 absolute flex justify-center">
      <div className="flex w-full space-x-2">
        <Card className="w-1/4 bg-green-950 opacity-90 h-full border-none rounded-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2 relative">
              <div className="w-8 text-left">
                <FaFutbol className="text-white" />
              </div>
              <div className="flex-grow text-center">
                Classificação atual
              </div>
              <div className="w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RankingTable />
          </CardContent>
        </Card>
        
        <Card className="w-3/4 bg-green-950 opacity-90 h-full border-none rounded-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2 relative">
              <div className="w-8 text-left">
                <FaFutbol className="text-white" />
              </div>
              <div className="flex-grow text-center">
                Classificação por temporada
              </div>
              <div className="w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center bg-white rounded-sm p-4 mx-4'>
            <div className="h-96 w-full">
              <Bar
                data={{
                  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                  datasets: [
                    {
                      label: 'Pontuação',
                      data: [100, 110, 120, 130, 140, 150],
                      backgroundColor: '#10B981',
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RankingPage;
