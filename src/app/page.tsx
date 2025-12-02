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
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Vibe Fit
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#beneficios" className="text-gray-300 hover:text-emerald-400 transition-colors">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-gray-300 hover:text-emerald-400 transition-colors">
              Como Funciona
            </a>
            <a href="#depoimentos" className="text-gray-300 hover:text-emerald-400 transition-colors">
              Depoimentos
            </a>
            <Link href="/diagnostico">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                Começar Agora
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
                  🔥 Mais de 5.000 pessoas transformadas
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Transforme seu corpo em{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  60 dias
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Planos de treino personalizados para emagrecer e ganhar saúde. 
                Treine em casa ou na academia com acompanhamento diário.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostico" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg h-14"
                  >
                    Fazer Diagnóstico Grátis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-14"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Ver Como Funciona
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">Sem equipamentos caros</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">20-40 min por dia</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl"></div>
              <Card className="relative bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-emerald-500/10 to-transparent p-6 rounded-xl border border-emerald-500/20">
                      <Target className="w-8 h-8 text-emerald-400 mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">-12kg</div>
                      <div className="text-sm text-gray-400">Média de perda</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-6 rounded-xl border border-cyan-500/20">
                      <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">94%</div>
                      <div className="text-sm text-gray-400">Taxa de sucesso</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-xl border border-purple-500/20">
                      <Clock className="w-8 h-8 text-purple-400 mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">30min</div>
                      <div className="text-sm text-gray-400">Por treino</div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-500/10 to-transparent p-6 rounded-xl border border-pink-500/20">
                      <Users className="w-8 h-8 text-pink-400 mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">5k+</div>
                      <div className="text-sm text-gray-400">Alunos ativos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Por que escolher o <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Vibe Fit?</span>
            </h2>
            <p className="text-xl text-gray-400">
              Tudo que você precisa para transformar seu corpo e saúde
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Planos Personalizados",
                description: "Treinos adaptados ao seu nível, objetivos e tempo disponível",
                color: "from-emerald-400 to-emerald-600"
              },
              {
                icon: Calendar,
                title: "Acompanhamento Diário",
                description: "Checklist de hábitos e registro de evolução para manter você motivado",
                color: "from-cyan-400 to-cyan-600"
              },
              {
                icon: Play,
                title: "Vídeos Exclusivos",
                description: "Biblioteca completa com demonstrações de cada exercício",
                color: "from-purple-400 to-purple-600"
              },
              {
                icon: Clock,
                title: "Treinos Rápidos",
                description: "Sessões de 20 a 40 minutos que cabem na sua rotina",
                color: "from-pink-400 to-pink-600"
              },
              {
                icon: Award,
                title: "Resultados Comprovados",
                description: "Método testado com mais de 5.000 transformações reais",
                color: "from-orange-400 to-orange-600"
              },
              {
                icon: Users,
                title: "Comunidade Ativa",
                description: "Suporte e motivação de uma comunidade engajada",
                color: "from-blue-400 to-blue-600"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-400">
              Simples, rápido e eficaz
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Diagnóstico",
                description: "Responda um questionário rápido sobre seus objetivos e rotina"
              },
              {
                step: "2",
                title: "Plano Personalizado",
                description: "Receba seu plano de treino customizado instantaneamente"
              },
              {
                step: "3",
                title: "Treine",
                description: "Siga os treinos com vídeos e instruções detalhadas"
              },
              {
                step: "4",
                title: "Acompanhe",
                description: "Registre sua evolução e veja os resultados acontecerem"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Histórias de <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">sucesso</span>
            </h2>
            <p className="text-xl text-gray-400">
              Veja o que nossos alunos estão dizendo
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                age: "32 anos",
                result: "-15kg em 60 dias",
                text: "Nunca imaginei que conseguiria emagrecer treinando em casa. O Vibe Fit mudou minha vida!",
                rating: 5
              },
              {
                name: "João Santos",
                age: "45 anos",
                result: "-10kg em 45 dias",
                text: "Treinos rápidos que cabem na minha rotina. Finalmente encontrei algo que funciona!",
                rating: 5
              },
              {
                name: "Ana Costa",
                age: "28 anos",
                result: "-12kg em 50 dias",
                text: "A comunidade é incrível! Sempre tem alguém para motivar e compartilhar experiências.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.age}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">{testimonial.result}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Pronto para começar sua transformação?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Faça seu diagnóstico gratuito e receba seu plano personalizado agora
              </p>
              <Link href="/diagnostico">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg h-14 px-8"
                >
                  Começar Agora - É Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-4">
                ✓ Sem cartão de crédito necessário • ✓ Resultado em 2 minutos
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Vibe Fit</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformando vidas através do fitness acessível e personalizado.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Desafios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Vibe Fit. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
