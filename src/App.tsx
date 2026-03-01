/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Waves, 
  ArrowRight, 
  ArrowLeft, 
  Droplets, 
  ThermometerSun, 
  CloudLightning,
  Trophy,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  details: string[];
}

const slides: Slide[] = [
  {
    id: 0,
    title: "¡Bienvenidos a la Gran Aventura del Agua!",
    description: "Hoy vamos a descubrir cómo viaja el agua por todo nuestro planeta. ¡Es un viaje que nunca termina!",
    icon: <Droplets className="w-24 h-24 text-blue-500" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    details: ["¿Sabías que el agua que bebes hoy es la misma que bebían los dinosaurios?", "¡El agua siempre se está reciclando!"]
  },
  {
    id: 1,
    title: "1. Evaporación",
    description: "Cuando el Sol calienta el agua de los ríos, lagos y mares, esta se convierte en vapor de agua (un gas invisible) y sube al cielo.",
    icon: <ThermometerSun className="w-24 h-24 text-orange-500" />,
    color: "text-orange-600",
    bg: "bg-orange-50",
    details: ["El Sol es el motor de este viaje.", "Es como cuando ves vapor saliendo de una sopa caliente."]
  },
  {
    id: 2,
    title: "2. Condensación",
    description: "Arriba en el cielo hace más frío. El vapor de agua se enfría y se convierte en pequeñas gotitas que forman las nubes.",
    icon: <Cloud className="w-24 h-24 text-gray-400" />,
    color: "text-gray-600",
    bg: "bg-slate-50",
    details: ["¡Millones de gotitas juntas forman una nube!", "Es como cuando empañas un cristal con tu aliento."]
  },
  {
    id: 3,
    title: "3. Precipitación",
    description: "Cuando las nubes están muy pesadas y llenas de agua, las gotitas caen a la Tierra.",
    icon: <CloudRain className="w-24 h-24 text-blue-400" />,
    color: "text-blue-700",
    bg: "bg-blue-100",
    details: ["Puede caer como lluvia, nieve o granizo.", "¡Depende de qué tan frío haga afuera!"]
  },
  {
    id: 4,
    title: "4. Recolección",
    description: "El agua que cae se junta en los ríos, lagos y océanos. También se filtra bajo la tierra.",
    icon: <Waves className="w-24 h-24 text-cyan-500" />,
    color: "text-cyan-700",
    bg: "bg-cyan-50",
    details: ["Los ríos llevan el agua de vuelta al mar.", "¡Y aquí el ciclo comienza otra vez!"]
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    setQuizAnswered(isCorrect);
    if (isCorrect) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetApp = () => {
    setCurrentSlide(0);
    setShowQuiz(false);
    setQuizAnswered(null);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`w-full max-w-4xl p-8 md:p-12 rounded-3xl shadow-2xl ${slide.bg} flex flex-col items-center text-center relative`}
            id={`slide-${currentSlide}`}
          >
            <div className="mb-8">
              {slide.icon}
            </div>
            
            <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${slide.color}`}>
              {slide.title}
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-slate-700 max-w-2xl">
              {slide.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
              {slide.details.map((detail, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-sm md:text-base font-medium text-slate-600"
                >
                  ✨ {detail}
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex gap-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`p-4 rounded-full transition-all ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/50 bg-white/30 shadow-sm'}`}
                id="prev-btn"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 group"
                id="next-btn"
              >
                {currentSlide === slides.length - 1 ? "¡A jugar!" : "Siguiente"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-0 w-full px-8">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl p-12 rounded-3xl shadow-2xl bg-indigo-50 flex flex-col items-center text-center"
            id="quiz-container"
          >
            {quizAnswered === null ? (
              <>
                <CloudLightning className="w-20 h-20 text-indigo-500 mb-6" />
                <h2 className="text-3xl font-bold text-indigo-900 mb-4">¡Desafío Final!</h2>
                <p className="text-xl text-indigo-700 mb-8">
                  ¿Cómo se llama el proceso cuando el agua cae del cielo en forma de lluvia?
                </p>
                <div className="grid grid-cols-1 gap-4 w-full">
                  <button 
                    onClick={() => handleQuizAnswer(false)}
                    className="p-4 bg-white hover:bg-red-50 border-2 border-transparent hover:border-red-200 rounded-2xl text-lg font-semibold transition-all shadow-sm"
                  >
                    Evaporación
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(true)}
                    className="p-4 bg-white hover:bg-green-50 border-2 border-transparent hover:border-green-200 rounded-2xl text-lg font-semibold transition-all shadow-sm"
                  >
                    Precipitación
                  </button>
                  <button 
                    onClick={() => handleQuizAnswer(false)}
                    className="p-4 bg-white hover:bg-red-50 border-2 border-transparent hover:border-red-200 rounded-2xl text-lg font-semibold transition-all shadow-sm"
                  >
                    Condensación
                  </button>
                </div>
              </>
            ) : quizAnswered ? (
              <>
                <Trophy className="w-24 h-24 text-yellow-500 mb-6 animate-bounce" />
                <h2 className="text-4xl font-bold text-green-700 mb-4">¡Excelente trabajo!</h2>
                <p className="text-xl text-slate-700 mb-8">
                  ¡Eres un experto en el ciclo del agua! Recuerda cuidar el agua, ¡es un tesoro para todos!
                </p>
                <button 
                  onClick={resetApp}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Empezar de nuevo
                </button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🤔</span>
                </div>
                <h2 className="text-3xl font-bold text-red-700 mb-4">¡Casi casi!</h2>
                <p className="text-xl text-slate-700 mb-8">
                  ¡No te preocupes! El agua cae como lluvia en la <b>Precipitación</b>.
                </p>
                <button 
                  onClick={() => setQuizAnswered(null)}
                  className="px-8 py-4 bg-slate-600 text-white rounded-full font-bold shadow-lg hover:bg-slate-700 transition-all"
                >
                  Intentar otra vez
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="fixed top-10 left-10 opacity-10 pointer-events-none">
        <Sun className="w-32 h-32 text-yellow-400 animate-pulse" />
      </div>
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none">
        <Waves className="w-48 h-48 text-blue-400" />
      </div>
    </div>
  );
}
