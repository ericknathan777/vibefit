"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Play,
  Award,
  Flame,
  Droplets,
  Moon,
  Apple,
  Activity
} from "lucide-react";
import Link from "next/link";

interface UserData {
  nome: string;
  peso: string;
  objetivo: string;
  nivel: string;
  local: string;
  tempo: string;
  frequencia: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  icon: any;
  completed: boolean;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentWeight, setCurrentWeight] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "treino", label: "Treino do dia", icon: Dumbbell, completed: false },
    { id: "agua", label: "2L de água", icon: Droplets, completed: false },
    { id: "alimentacao", label: "Alimentação saudável", icon: Apple, completed: false },
    { id: "sono", label: "8h de sono", icon: Moon, completed: false },
    { id: "passos", label: "10.000 passos", icon: Activity, completed: false }
  ]);

  const [streak, setStreak] = useState(7);
  const [totalWorkouts, setTotalWorkouts] = useState(12);
  const [weightLost, setWeightLost] = useState(3.5);

  useEffect(() => {
    const stored = localStorage.getItem("vibefit_user");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedItems = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedItems / checklist.length) * 100;

  const getObjetivoText = (objetivo: string) => {
    const objetivos: { [key: string]: string } = {
      emagrecer: "Emagrecer e perder gordura",
      tonificar: "Tonificar e definir músculos",
      ganhar: "Ganhar massa muscular",
      saude: "Melhorar saúde e condicionamento"
    };
    return objetivos[objetivo] || objetivo;
  };

  const getPlanoTreino = () => {
    if (!userData) return [];
    
    const planos: { [key: string]: any } = {
      iniciante: [
        { dia: "Segunda", treino: "Corpo Inteiro - Iniciante", duracao: "25 min" },
        { dia: "Quarta", treino: "Cardio + Core", duracao: "20 min" },
        { dia: "Sexta", treino: "Corpo Inteiro - Iniciante", duracao: "25 min" }
      ],
      intermediario: [
        { dia: "Segunda", treino: "Peito + Tríceps", duracao: "35 min" },
        { dia: "Terça", treino: "Pernas + Glúteos", duracao: "40 min" },
        { dia: "Quinta", treino: "Costas + Bíceps", duracao: "35 min" },
        { dia: "Sexta", treino: "Ombros + Core", duracao: "30 min" }
      ],
      avancado: [
        { dia: "Segunda", treino: "Peito + Tríceps", duracao: "45 min" },
        { dia: "Terça", treino: "Costas + Bíceps", duracao: "45 min" },
        { dia: "Quarta", treino: "Pernas", duracao: "50 min" },
        { dia: "Quinta", treino: "Ombros + Core", duracao: "40 min" },
        { dia: "Sexta", treino: "Corpo Inteiro", duracao: "45 min" }
      ]
    };

    return planos[userData.nivel] || planos.iniciante;
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="bg-slate-900/50 border-slate-800 p-8">
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">Você precisa fazer o diagnóstico primeiro</p>
            <Link href="/diagnostico">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                Fazer Diagnóstico
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Vibe Fit
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 hidden sm:block">Olá, {userData.nome.split(" ")[0]}!</span>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Bem-vindo de volta, {userData.nome.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-400">
            Continue sua jornada rumo ao seu objetivo: {getObjetivoText(userData.objetivo)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Sequência</p>
                  <p className="text-3xl font-bold text-white">{streak} dias</p>
                </div>
                <Flame className="w-10 h-10 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Treinos</p>
                  <p className="text-3xl font-bold text-white">{totalWorkouts}</p>
                </div>
                <Dumbbell className="w-10 h-10 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Peso Perdido</p>
                  <p className="text-3xl font-bold text-white">-{weightLost}kg</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/10 to-transparent border-pink-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Conquistas</p>
                  <p className="text-3xl font-bold text-white">8</p>
                </div>
                <Award className="w-10 h-10 text-pink-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checklist Diário */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Checklist Diário</span>
                  <span className="text-sm font-normal text-gray-400">
                    {completedItems}/{checklist.length} completos
                  </span>
                </CardTitle>
                <Progress value={progressPercentage} className="mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="border-slate-600"
                    />
                    <item.icon className={`w-5 h-5 ${item.completed ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <label
                      htmlFor={item.id}
                      className={`flex-1 cursor-pointer ${item.completed ? 'text-gray-400 line-through' : 'text-white'}`}
                    >
                      {item.label}
                    </label>
                    {item.completed && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Plano de Treino Semanal */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Seu Plano de Treino Semanal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getPlanoTreino().map((treino, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Dumbbell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{treino.treino}</p>
                        <p className="text-sm text-gray-400">{treino.dia} • {treino.duracao}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registro de Peso */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Registrar Peso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Peso atual (kg)</label>
                  <Input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder={userData.peso}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                  Salvar Peso
                </Button>
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Peso inicial:</span>
                    <span className="text-white font-medium">{userData.peso}kg</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Peso atual:</span>
                    <span className="text-white font-medium">{parseFloat(userData.peso) - weightLost}kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progresso:</span>
                    <span className="text-emerald-400 font-medium">-{weightLost}kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Motivação */}
            <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Continue assim! 🎉
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Você está {streak} dias consecutivos treinando. Mantenha o ritmo!
                </p>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Próxima conquista em:</p>
                  <p className="text-white font-bold">3 dias</p>
                </div>
              </CardContent>
            </Card>

            {/* Dicas do Dia */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">💡 Dica do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Beba água antes, durante e depois do treino. A hidratação adequada melhora seu desempenho e recuperação!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
