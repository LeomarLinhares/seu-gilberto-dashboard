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
import { FaArrowUp, FaArrowDown, FaFutbol } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Registra os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dados de exemplo para a classificação dos usuários
const currentRankingData = [
  { name: 'Alice', score: 120, change: 'up' },
  { name: 'Bob', score: 115, change: 'down' },
  { name: 'Charlie', score: 110, change: 'up' },
];

// Dados de exemplo para o gráfico de evolução por temporadas
const rankingBySeason = {
  labels: ['Temporada 1', 'Temporada 2', 'Temporada 3'],
  datasets: [
    {
      label: 'Posição Final',
      data: [3, 2, 1],
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderColor: 'rgba(255,255,255,1)',
      borderWidth: 1,
    },
  ],
};

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
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
              Variação
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {currentRankingData.map((player, index) => (
            <tr key={index}>
              <td className="px-4 py-3 text-gray-700">{player.name}</td>
              <td className="px-4 py-3 font-bold text-gray-700">{player.score}</td>
              <td className="px-4 py-3">
                {player.change === 'up' ? (
                  <div className="flex items-center">
                    <FaArrowUp className="text-green-600 mr-1" />
                    <span className="text-green-600 font-semibold">Subiu</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaArrowDown className="text-red-600 mr-1" />
                    <span className="text-red-600 font-semibold">Desceu</span>
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
    <div className="min-h-screen w-full bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-5xl font-extrabold text-center text-white flex items-center justify-center gap-2">
            <FaFutbol className="text-yellow-400" />
            Ranking dos Usuários
          </h1>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Card com a tabela de classificação */}
          <Card className="md:w-1/2 bg-white bg-opacity-95 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FaFutbol className="text-green-600" />
                Classificação Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RankingTable />
            </CardContent>
          </Card>
          {/* Card com o gráfico de evolução por temporadas */}
          <Card className="md:w-1/2 bg-white bg-opacity-95 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">
                Evolução por Temporadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar
                  data={rankingBySeason}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { color: '#374151', font: { size: 14 } },
                      },
                      x: {
                        ticks: { color: '#374151', font: { size: 14 } },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        labels: { color: '#374151' },
                      },
                      title: {
                        display: true,
                        text: 'Posição Final por Temporada',
                        color: '#374151',
                        font: { size: 20, weight: 'bold' },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
