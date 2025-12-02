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
  Activity,
  Zap,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/login");
      return;
    }

    // Carregar dados do usuário do localStorage (temporário)
    const stored = localStorage.getItem("vibefit_user");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleChecklistItem = async (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );

    // Salvar no Supabase
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const item = checklist.find(i => i.id === id);
      if (item) {
        await supabase.from("habitos").upsert({
          user_id: session.user.id,
          tipo: id,
          concluido: !item.completed,
          data: new Date().toISOString().split('T')[0]
        }, {
          onConflict: 'user_id,tipo,data'
        });
      }
    }
  };

  const handleSaveWeight = async () => {
    if (!currentWeight) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from("registros_peso").insert({
        user_id: session.user.id,
        peso: parseFloat(currentWeight),
        data: new Date().toISOString().split('T')[0]
      });

      setCurrentWeight("");
      alert("Peso registrado com sucesso!");
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-700 text-lg">Carregando...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/30 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-12 text-center shadow-xl">
          <p className="text-gray-700 mb-6 text-lg">Você precisa fazer o diagnóstico primeiro</p>
          <Link href="/diagnostico">
            <Button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:shadow-lg text-white font-bold">
              Fazer Diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-emerald-300/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-cyan-300/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300/30 rounded-full blur-[120px] animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-emerald-100/50 bg-white/60 backdrop-blur-xl sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Vibe Fit
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-800 font-semibold hidden sm:block">Olá, {userData.nome.split(" ")[0]}! 👋</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-emerald-200 text-gray-700 hover:bg-emerald-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </nav>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Bem-vindo de volta, {userData.nome.split(" ")[0]}!
          </h1>
          <p className="text-gray-700 text-lg">
            Continue sua jornada: <span className="text-gray-900 font-semibold">{getObjetivoText(userData.objetivo)}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Flame, label: "Sequência", value: `${streak} dias`, color: "from-orange-400 to-red-400" },
            { icon: Dumbbell, label: "Treinos", value: totalWorkouts, color: "from-emerald-400 to-cyan-400" },
            { icon: TrendingUp, label: "Peso Perdido", value: `-${weightLost}kg`, color: "from-cyan-400 to-blue-400" },
            { icon: Award, label: "Conquistas", value: "8", color: "from-blue-400 to-emerald-400" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-6 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checklist Diário */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">Checklist Diário</h2>
                <span className="text-sm font-semibold text-gray-600">
                  {completedItems}/{checklist.length} completos
                </span>
              </div>
              <Progress value={progressPercentage} className="mb-8 h-3" />
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 transition-all duration-300"
                  >
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="border-emerald-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-cyan-500"
                    />
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.completed ? 'bg-gradient-to-br from-emerald-400 to-cyan-400' : 'bg-white'} transition-all`}>
                      <item.icon className={`w-6 h-6 ${item.completed ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <label
                      htmlFor={item.id}
                      className={`flex-1 cursor-pointer font-semibold ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}
                    >
                      {item.label}
                    </label>
                    {item.completed && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Plano de Treino Semanal */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Calendar className="w-7 h-7" />
                Seu Plano Semanal
              </h2>
              <div className="space-y-4">
                {getPlanoTreino().map((treino, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Dumbbell className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-lg">{treino.treino}</p>
                        <p className="text-sm text-gray-600 font-medium">{treino.dia} • {treino.duracao}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg text-white font-bold transition-all duration-300 hover:scale-105"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Registro de Peso */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 shadow-lg">
              <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6" />
                Registrar Peso
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block font-medium">Peso atual (kg)</label>
                  <Input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder={userData.peso}
                    className="bg-white border-emerald-200 text-gray-900 font-semibold focus:border-emerald-400 focus:ring-emerald-400"
                  />
                </div>
                <Button 
                  onClick={handleSaveWeight}
                  className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:shadow-lg text-white font-bold transition-all duration-300"
                >
                  Salvar Peso
                </Button>
                <div className="pt-6 border-t border-emerald-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Peso inicial:</span>
                    <span className="text-gray-900 font-bold">{userData.peso}kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Peso atual:</span>
                    <span className="text-gray-900 font-bold">{parseFloat(userData.peso) - weightLost}kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Progresso:</span>
                    <span className="text-emerald-600 font-bold">-{weightLost}kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivação */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 text-center shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  Continue assim! 🎉
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Você está <span className="text-gray-900 font-bold">{streak} dias consecutivos</span> treinando. Mantenha o ritmo!
                </p>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Próxima conquista em:</p>
                  <p className="text-gray-900 font-black text-2xl">3 dias</p>
                </div>
              </div>
            </div>

            {/* Dicas do Dia */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Dica do Dia</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Beba água antes, durante e depois do treino. A hidratação adequada melhora seu desempenho e recuperação!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
