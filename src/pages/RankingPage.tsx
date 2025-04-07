import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaFutbol } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RankingData {
  userName: string;
  totalSeasonPoints: number;
  totalRawScore: number;
  movementIndicator: 'up' | 'down' | null;
}

interface CumulativeSeries {
  userName: string;
  points: { roundNumber: number; cumulativeScore: number }[];
}

interface CurrentRoundScores {
  userName: string;
  roundScore: number;
}

interface RankingPageProps {
  ranking: RankingData[];
  cumulativeSeries: CumulativeSeries[];
  currentRoundScores: CurrentRoundScores[];
}

interface IRankingTableProps {
  ranking: RankingData[];
}

// Registra os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'];

const RankingTable: React.FC<IRankingTableProps> = ({ ranking }: IRankingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">
              Usuário
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">
              Pontuação
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">
              Pontuação Geral
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {
            ranking.map((player, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm text-gray-800">{player.userName}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{player.totalSeasonPoints}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{player.totalRawScore}</td>

                <td className="px-4 py-3 text-sm text-gray-800">
                  {player.movementIndicator === 'up' && <ChevronUp className="w-4 h-4 text-green-500" />}
                  {player.movementIndicator === 'down' && <ChevronDown className="w-4 h-4 text-red-500" />}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

// =================================================================
// PÁGINA DE RANKING
// =================================================================

const RankingPage: React.FC = () => {
  const [data, setData] = useState<RankingPageProps | null>(null);
  
  const fetchData = async () => {
    const response = await fetch('http://localhost:5264/GeneralInfoPanel/dashboard/2');
    const responseData = await response.json();
    setData(responseData);
  }

  
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-2xl text-gray-700">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="absolute z-10 flex justify-center w-full h-screen p-8 mx-auto overflow-y-scroll">
      <div className="flex flex-col w-full space-x-2 space-y-8 md:flex-row">

        {/* CARD ESQUERDO: Tabela de Classificação Atual */}
        <Card className="w-full h-full border-none rounded-sm md:w-1/4 md:min-w-75 bg-green-950 opacity-90 ">
          <CardHeader>
            <CardTitle className="relative flex items-center justify-center gap-2 text-2xl font-bold text-white">
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
            {
              data !== null && data.ranking.length > 0 && <RankingTable ranking={data.ranking} />
            }
          </CardContent>
        </Card>

        {/* CARD DIREITO: Gráficos de Desempenho */}
        <Card className="w-3/4 w-full h-full border-none rounded-sm bg-green-950 opacity-90">
          <CardHeader>
            <CardTitle className="relative flex items-center justify-center gap-2 text-2xl font-bold text-white">
              <div className="w-8 text-left">
                <FaFutbol className="text-white" />
              </div>
              <div className="flex-grow text-center">
                Desempenho dos Jogadores
              </div>
              <div className="w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-4 mx-4 bg-white rounded-sm md:flex-row">
            <div className="flex flex-col w-full space-y-8 md:w-1/2">
              {/* Primeiro Gráfico: Barra vertical ordenada do maior para o menor */}
              <div className="w-full mb-8">
                <h2 className="mb-2 text-xl font-semibold text-center text-gray-700">
                  Pontuação da Rodada Atual (Ordenada)
                </h2>
                <div className="h-64">
                  <Bar
                     data={{
                      labels: data.currentRoundScores.map(player => `${player.userName} (${player.roundScore} pontos)`),
                      datasets: [
                        {
                          label: 'Pontuação da Rodada',
                          data: data.currentRoundScores
                            .sort((x, y) => y.roundScore - x.roundScore)
                            .map(player => player.roundScore),
                          backgroundColor: data.currentRoundScores.map((_, index) => `rgba(75, 192, 192, ${0.2 + index * 0.2})`),
                          borderColor: data.currentRoundScores.map((_, index) => `rgba(75, 192, 192, ${0.8 + index * 0.1})`),
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      indexAxis: 'y',
                      scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { display: false } },
                      },
                    }}  
                  />
                </div>
              </div>

              {/* Segundo Gráfico: Linha com o acúmulo das rodadas */}
              <div className="w-full">
                <h2 className="mb-2 text-xl font-semibold text-center text-gray-700">
                  Acúmulo de Todas as Rodadas
                </h2>
                <div className="h-64">
                  <Line
                    data={{
                      labels: data.cumulativeSeries[0]?.points.map(point => `Rodada ${point.roundNumber}`) || [],
                      datasets: data.cumulativeSeries.map((series, index) => ({
                        label: series.userName,
                        data: series.points.map(point => point.cumulativeScore),
                        backgroundColor: colors[index],
                        borderColor: colors[index],
                        tension: 0.2,
                      })),
                    }}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { display: false } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RankingPage;
