"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  Dumbbell,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  nome: string;
  idade: string;
  peso: string;
  altura: string;
  objetivo: string;
  nivel: string;
  local: string;
  tempo: string;
  frequencia: string;
}

export default function DiagnosticoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    idade: "",
    peso: "",
    altura: "",
    objetivo: "",
    nivel: "",
    local: "",
    tempo: "",
    frequencia: ""
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Salvar dados e redirecionar para dashboard
      localStorage.setItem("vibefit_user", JSON.stringify(formData));
      router.push("/dashboard");
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.nome && formData.idade && formData.peso && formData.altura;
      case 2:
        return formData.objetivo;
      case 3:
        return formData.nivel;
      case 4:
        return formData.local;
      case 5:
        return formData.tempo && formData.frequencia;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Vibe Fit
            </span>
          </Link>
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {step === 1 && "Informações Básicas"}
                {step === 2 && "Qual é o seu objetivo?"}
                {step === 3 && "Qual é o seu nível atual?"}
                {step === 4 && "Onde você vai treinar?"}
                {step === 5 && "Disponibilidade de Tempo"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Informações Básicas */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome" className="text-gray-300">Nome completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => updateFormData("nome", e.target.value)}
                      placeholder="Seu nome"
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="idade" className="text-gray-300">Idade</Label>
                      <Input
                        id="idade"
                        type="number"
                        value={formData.idade}
                        onChange={(e) => updateFormData("idade", e.target.value)}
                        placeholder="Ex: 30"
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="peso" className="text-gray-300">Peso (kg)</Label>
                      <Input
                        id="peso"
                        type="number"
                        value={formData.peso}
                        onChange={(e) => updateFormData("peso", e.target.value)}
                        placeholder="Ex: 75"
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="altura" className="text-gray-300">Altura (cm)</Label>
                    <Input
                      id="altura"
                      type="number"
                      value={formData.altura}
                      onChange={(e) => updateFormData("altura", e.target.value)}
                      placeholder="Ex: 170"
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Objetivo */}
              {step === 2 && (
                <RadioGroup value={formData.objetivo} onValueChange={(value) => updateFormData("objetivo", value)}>
                  <div className="space-y-3">
                    {[
                      { value: "emagrecer", label: "Emagrecer e perder gordura", emoji: "🔥" },
                      { value: "tonificar", label: "Tonificar e definir músculos", emoji: "💪" },
                      { value: "ganhar", label: "Ganhar massa muscular", emoji: "🏋️" },
                      { value: "saude", label: "Melhorar saúde e condicionamento", emoji: "❤️" }
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer text-white">
                          <span className="mr-2">{option.emoji}</span>
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 3: Nível */}
              {step === 3 && (
                <RadioGroup value={formData.nivel} onValueChange={(value) => updateFormData("nivel", value)}>
                  <div className="space-y-3">
                    {[
                      { value: "iniciante", label: "Iniciante", desc: "Nunca treinei ou parei há muito tempo" },
                      { value: "intermediario", label: "Intermediário", desc: "Treino há alguns meses" },
                      { value: "avancado", label: "Avançado", desc: "Treino regularmente há mais de 1 ano" }
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          <div className="text-white font-medium">{option.label}</div>
                          <div className="text-sm text-gray-400">{option.desc}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 4: Local */}
              {step === 4 && (
                <RadioGroup value={formData.local} onValueChange={(value) => updateFormData("local", value)}>
                  <div className="space-y-3">
                    {[
                      { value: "casa", label: "Em casa", desc: "Sem ou com poucos equipamentos", emoji: "🏠" },
                      { value: "academia", label: "Na academia", desc: "Acesso completo a equipamentos", emoji: "🏋️" },
                      { value: "ambos", label: "Ambos", desc: "Flexibilidade para treinar onde quiser", emoji: "🔄" }
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          <div className="text-white font-medium">
                            <span className="mr-2">{option.emoji}</span>
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-400">{option.desc}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 5: Tempo */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-gray-300 mb-3 block">Quanto tempo você tem por treino?</Label>
                    <RadioGroup value={formData.tempo} onValueChange={(value) => updateFormData("tempo", value)}>
                      <div className="space-y-3">
                        {[
                          { value: "20", label: "20 minutos" },
                          { value: "30", label: "30 minutos" },
                          { value: "40", label: "40 minutos" },
                          { value: "60", label: "60 minutos ou mais" }
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50">
                            <RadioGroupItem value={option.value} id={`tempo-${option.value}`} />
                            <Label htmlFor={`tempo-${option.value}`} className="flex-1 cursor-pointer text-white">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-3 block">Quantos dias por semana você pode treinar?</Label>
                    <RadioGroup value={formData.frequencia} onValueChange={(value) => updateFormData("frequencia", value)}>
                      <div className="space-y-3">
                        {[
                          { value: "3", label: "3 dias por semana" },
                          { value: "4", label: "4 dias por semana" },
                          { value: "5", label: "5 dias por semana" },
                          { value: "6", label: "6 ou mais dias por semana" }
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800/50">
                            <RadioGroupItem value={option.value} id={`freq-${option.value}`} />
                            <Label htmlFor={`freq-${option.value}`} className="flex-1 cursor-pointer text-white">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white disabled:opacity-50"
                >
                  {step === totalSteps ? (
                    <>
                      <CheckCircle2 className="mr-2 w-4 h-4" />
                      Gerar Meu Plano
                    </>
                  ) : (
                    <>
                      Próximo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
