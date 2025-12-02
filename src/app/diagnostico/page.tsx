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
  CheckCircle2,
  Zap
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
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-[#0A0A0F]/60 backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Vibe Fit
            </span>
          </Link>
        </nav>
      </header>

      {/* Progress Bar */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 font-semibold">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-white font-bold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Form Content */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-white mb-2">
                {step === 1 && "Informações Básicas"}
                {step === 2 && "Qual é o seu objetivo?"}
                {step === 3 && "Qual é o seu nível atual?"}
                {step === 4 && "Onde você vai treinar?"}
                {step === 5 && "Disponibilidade de Tempo"}
              </h2>
              <p className="text-gray-400">
                {step === 1 && "Vamos começar conhecendo você melhor"}
                {step === 2 && "Escolha o que melhor descreve sua meta"}
                {step === 3 && "Seja honesto para termos os melhores resultados"}
                {step === 4 && "Vamos adaptar os treinos ao seu ambiente"}
                {step === 5 && "Quanto tempo você pode dedicar?"}
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1: Informações Básicas */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="nome" className="text-gray-300 font-semibold mb-2 block">Nome completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => updateFormData("nome", e.target.value)}
                      placeholder="Seu nome"
                      className="bg-white/5 border-white/10 text-white h-14 text-lg font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="idade" className="text-gray-300 font-semibold mb-2 block">Idade</Label>
                      <Input
                        id="idade"
                        type="number"
                        value={formData.idade}
                        onChange={(e) => updateFormData("idade", e.target.value)}
                        placeholder="Ex: 30"
                        className="bg-white/5 border-white/10 text-white h-14 text-lg font-medium"
                      />
                    </div>
                    <div>
                      <Label htmlFor="peso" className="text-gray-300 font-semibold mb-2 block">Peso (kg)</Label>
                      <Input
                        id="peso"
                        type="number"
                        value={formData.peso}
                        onChange={(e) => updateFormData("peso", e.target.value)}
                        placeholder="Ex: 75"
                        className="bg-white/5 border-white/10 text-white h-14 text-lg font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="altura" className="text-gray-300 font-semibold mb-2 block">Altura (cm)</Label>
                    <Input
                      id="altura"
                      type="number"
                      value={formData.altura}
                      onChange={(e) => updateFormData("altura", e.target.value)}
                      placeholder="Ex: 170"
                      className="bg-white/5 border-white/10 text-white h-14 text-lg font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Objetivo */}
              {step === 2 && (
                <RadioGroup value={formData.objetivo} onValueChange={(value) => updateFormData("objetivo", value)}>
                  <div className="space-y-4">
                    {[
                      { value: "emagrecer", label: "Emagrecer e perder gordura", emoji: "🔥" },
                      { value: "tonificar", label: "Tonificar e definir músculos", emoji: "💪" },
                      { value: "ganhar", label: "Ganhar massa muscular", emoji: "🏋️" },
                      { value: "saude", label: "Melhorar saúde e condicionamento", emoji: "❤️" }
                    ].map((option) => (
                      <div key={option.value} className="group relative">
                        <input
                          type="radio"
                          id={option.value}
                          value={option.value}
                          checked={formData.objetivo === option.value}
                          onChange={(e) => updateFormData("objetivo", e.target.value)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={option.value}
                          className="flex items-center gap-4 p-6 rounded-2xl border-2 border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500/10 peer-checked:to-pink-500/10"
                        >
                          <span className="text-4xl">{option.emoji}</span>
                          <span className="text-white font-bold text-lg flex-1">{option.label}</span>
                          {formData.objetivo === option.value && (
                            <CheckCircle2 className="w-6 h-6 text-purple-400" />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 3: Nível */}
              {step === 3 && (
                <RadioGroup value={formData.nivel} onValueChange={(value) => updateFormData("nivel", value)}>
                  <div className="space-y-4">
                    {[
                      { value: "iniciante", label: "Iniciante", desc: "Nunca treinei ou parei há muito tempo" },
                      { value: "intermediario", label: "Intermediário", desc: "Treino há alguns meses" },
                      { value: "avancado", label: "Avançado", desc: "Treino regularmente há mais de 1 ano" }
                    ].map((option) => (
                      <div key={option.value} className="group relative">
                        <input
                          type="radio"
                          id={option.value}
                          value={option.value}
                          checked={formData.nivel === option.value}
                          onChange={(e) => updateFormData("nivel", e.target.value)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={option.value}
                          className="flex items-center gap-4 p-6 rounded-2xl border-2 border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500/10 peer-checked:to-pink-500/10"
                        >
                          <div className="flex-1">
                            <div className="text-white font-bold text-lg mb-1">{option.label}</div>
                            <div className="text-sm text-gray-400">{option.desc}</div>
                          </div>
                          {formData.nivel === option.value && (
                            <CheckCircle2 className="w-6 h-6 text-purple-400" />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 4: Local */}
              {step === 4 && (
                <RadioGroup value={formData.local} onValueChange={(value) => updateFormData("local", value)}>
                  <div className="space-y-4">
                    {[
                      { value: "casa", label: "Em casa", desc: "Sem ou com poucos equipamentos", emoji: "🏠" },
                      { value: "academia", label: "Na academia", desc: "Acesso completo a equipamentos", emoji: "🏋️" },
                      { value: "ambos", label: "Ambos", desc: "Flexibilidade para treinar onde quiser", emoji: "🔄" }
                    ].map((option) => (
                      <div key={option.value} className="group relative">
                        <input
                          type="radio"
                          id={option.value}
                          value={option.value}
                          checked={formData.local === option.value}
                          onChange={(e) => updateFormData("local", e.target.value)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={option.value}
                          className="flex items-center gap-4 p-6 rounded-2xl border-2 border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500/10 peer-checked:to-pink-500/10"
                        >
                          <span className="text-4xl">{option.emoji}</span>
                          <div className="flex-1">
                            <div className="text-white font-bold text-lg mb-1">{option.label}</div>
                            <div className="text-sm text-gray-400">{option.desc}</div>
                          </div>
                          {formData.local === option.value && (
                            <CheckCircle2 className="w-6 h-6 text-purple-400" />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 5: Tempo */}
              {step === 5 && (
                <div className="space-y-8">
                  <div>
                    <Label className="text-gray-300 font-semibold mb-4 block text-lg">Quanto tempo você tem por treino?</Label>
                    <RadioGroup value={formData.tempo} onValueChange={(value) => updateFormData("tempo", value)}>
                      <div className="space-y-3">
                        {[
                          { value: "20", label: "20 minutos" },
                          { value: "30", label: "30 minutos" },
                          { value: "40", label: "40 minutos" },
                          { value: "60", label: "60 minutos ou mais" }
                        ].map((option) => (
                          <div key={option.value} className="group relative">
                            <input
                              type="radio"
                              id={`tempo-${option.value}`}
                              value={option.value}
                              checked={formData.tempo === option.value}
                              onChange={(e) => updateFormData("tempo", e.target.value)}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={`tempo-${option.value}`}
                              className="flex items-center justify-between p-5 rounded-2xl border-2 border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500/10 peer-checked:to-pink-500/10"
                            >
                              <span className="text-white font-bold">{option.label}</span>
                              {formData.tempo === option.value && (
                                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-gray-300 font-semibold mb-4 block text-lg">Quantos dias por semana você pode treinar?</Label>
                    <RadioGroup value={formData.frequencia} onValueChange={(value) => updateFormData("frequencia", value)}>
                      <div className="space-y-3">
                        {[
                          { value: "3", label: "3 dias por semana" },
                          { value: "4", label: "4 dias por semana" },
                          { value: "5", label: "5 dias por semana" },
                          { value: "6", label: "6 ou mais dias por semana" }
                        ].map((option) => (
                          <div key={option.value} className="group relative">
                            <input
                              type="radio"
                              id={`freq-${option.value}`}
                              value={option.value}
                              checked={formData.frequencia === option.value}
                              onChange={(e) => updateFormData("frequencia", e.target.value)}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={`freq-${option.value}`}
                              className="flex items-center justify-between p-5 rounded-2xl border-2 border-white/10 bg-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 peer-checked:border-purple-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500/10 peer-checked:to-pink-500/10"
                            >
                              <span className="text-white font-bold">{option.label}</span>
                              {formData.frequencia === option.value && (
                                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 h-14 font-bold"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] text-white h-14 font-black disabled:opacity-50 transition-all duration-300 hover:scale-105"
                >
                  {step === totalSteps ? (
                    <>
                      <Zap className="mr-2 w-5 h-5" />
                      Gerar Meu Plano
                    </>
                  ) : (
                    <>
                      Próximo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
