"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Play,
  Users,
  Award,
  Calendar,
  ArrowRight,
  Zap,
  Heart,
  Star
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-emerald-300/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-cyan-300/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300/30 rounded-full blur-[120px] animate-pulse delay-2000"></div>
      </div>

      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-white/60 backdrop-blur-xl border-b border-emerald-100/50 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Vibe Fit
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 font-medium">
              Como Funciona
            </a>
            <a href="#depoimentos" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
              Depoimentos
            </a>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:shadow-lg text-white font-bold transition-all duration-300 hover:scale-105">
                Começar Agora
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 via-cyan-100 to-blue-100 backdrop-blur-sm border border-emerald-200 px-5 py-2.5 rounded-full">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 border-2 border-white"></div>
                </div>
                <span className="text-gray-800 font-semibold text-sm">+5.000 vidas transformadas</span>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight">
                Seu corpo
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  transformado
                </span>
                <br />
                em 60 dias
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
                Planos de treino personalizados com IA. Resultados reais, sem enrolação.
                <span className="text-gray-900 font-semibold"> Comece hoje mesmo.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="group">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:shadow-xl text-white text-lg h-16 px-8 font-bold transition-all duration-300 hover:scale-105"
                  >
                    Começar Grátis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-emerald-200 bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-emerald-50 h-16 px-8 font-bold transition-all duration-300"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Ver Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700 font-medium">Sem equipamentos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                  <span className="text-gray-700 font-medium">20-40 min/dia</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 via-cyan-200/30 to-blue-200/30 blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { icon: Target, value: "-12kg", label: "Média de perda", color: "from-emerald-400 to-cyan-400" },
                  { icon: TrendingUp, value: "94%", label: "Taxa de sucesso", color: "from-cyan-400 to-blue-400" },
                  { icon: Clock, value: "30min", label: "Por treino", color: "from-blue-400 to-emerald-400" },
                  { icon: Users, value: "5k+", label: "Alunos ativos", color: "from-emerald-500 to-blue-500" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-6 hover:bg-white transition-all duration-300 hover:scale-105 hover:border-emerald-200 hover:shadow-xl"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="relative py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Por que Vibe Fit?</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Tudo que você precisa
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                em um só lugar
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Planos Personalizados",
                description: "IA cria treinos sob medida para você",
                color: "from-emerald-400 to-cyan-400"
              },
              {
                icon: Calendar,
                title: "Acompanhamento Diário",
                description: "Checklist inteligente de hábitos",
                color: "from-cyan-400 to-blue-400"
              },
              {
                icon: Play,
                title: "Vídeos HD",
                description: "Biblioteca completa de exercícios",
                color: "from-blue-400 to-emerald-400"
              },
              {
                icon: Clock,
                title: "Treinos Rápidos",
                description: "Cabe na sua rotina corrida",
                color: "from-emerald-500 to-cyan-500"
              },
              {
                icon: Award,
                title: "Resultados Garantidos",
                description: "Método validado por 5.000+ pessoas",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: Heart,
                title: "Comunidade Ativa",
                description: "Suporte e motivação 24/7",
                color: "from-blue-500 to-emerald-500"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 hover:bg-white transition-all duration-300 hover:scale-105 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="relative py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider">Processo Simples</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              4 passos para sua
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                transformação
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 opacity-30"></div>
            
            {[
              {
                step: "1",
                title: "Diagnóstico",
                description: "2 minutos para entender você",
                icon: Target
              },
              {
                step: "2",
                title: "Plano IA",
                description: "Treino personalizado instantâneo",
                icon: Zap
              },
              {
                step: "3",
                title: "Treine",
                description: "Vídeos e instruções detalhadas",
                icon: Play
              },
              {
                step: "4",
                title: "Evolua",
                description: "Acompanhe resultados reais",
                icon: TrendingUp
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-full flex items-center justify-center border-4 border-white group-hover:scale-110 transition-transform shadow-lg">
                      <step.icon className="w-9 h-9 text-white" />
                    </div>
                  </div>
                  <div className="text-5xl font-black text-emerald-100 mb-2">{step.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="relative py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Resultados Reais</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Histórias de
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                transformação
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                age: "32 anos",
                result: "-15kg em 60 dias",
                text: "Nunca imaginei que conseguiria emagrecer treinando em casa. O Vibe Fit mudou minha vida completamente!",
                rating: 5,
                image: "MS"
              },
              {
                name: "João Santos",
                age: "45 anos",
                result: "-10kg em 45 dias",
                text: "Treinos rápidos que cabem na minha rotina. Finalmente encontrei algo que realmente funciona!",
                rating: 5,
                image: "JS"
              },
              {
                name: "Ana Costa",
                age: "28 anos",
                result: "-12kg em 50 dias",
                text: "A comunidade é incrível! Sempre tem alguém para motivar e compartilhar experiências.",
                rating: 5,
                image: "AC"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.age}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                        {testimonial.result}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-[3rem] p-16 text-center shadow-2xl">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Pronto para começar?
              </h2>
              <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                Faça seu diagnóstico gratuito e receba seu plano personalizado em 2 minutos
              </p>
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:shadow-2xl text-white text-xl h-20 px-12 font-black transition-all duration-300 hover:scale-105"
                >
                  Começar Agora - É Grátis
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-6 flex items-center justify-center gap-6">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Sem cartão
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  Resultado em 2 min
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-emerald-100 py-16 px-4 bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-gray-900">Vibe Fit</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Transformando vidas através do fitness acessível e personalizado.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Produto</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Desafios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Legal</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-cyan-600 transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-100 pt-8 text-center text-gray-600">
            <p>© 2024 Vibe Fit. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
