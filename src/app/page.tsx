"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import teslaImage from "@/app/tesla.png";

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30;
  const totalMonths = Math.floor(totalDays / 30);
  const months = totalMonths % 12;
  const years = Math.floor(totalMonths / 12);

  return `${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
};

export default function Home() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startTimer = (): void => {
    const now = Date.now();
    setStartTime(now - elapsedTime);
    setIsRunning(true);
    localStorage.setItem("startTime", now.toString());
  };

  const stopTimer = (): void => {
    setIsRunning(false);
    localStorage.removeItem("startTime");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        if (startTime !== null) {
          setElapsedTime(Date.now() - startTime);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime]);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("startTime");
    if (savedStartTime) {
      const now = Date.now();
      const savedElapsedTime = now - parseInt(savedStartTime, 10);
      setElapsedTime(savedElapsedTime);
      setStartTime(parseInt(savedStartTime, 10));
      setIsRunning(true);
    }
  }, []);

  return (
    <div>
      <div className="w-[393px] bg-zinc-800 h-[790px] m-auto relative">
        {/* Imagem de fundo */}
        <Image
          src={teslaImage}
          alt="image tesla model 3 white"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />

        {/* Contador e botões sobrepostos */}
        <div className="absolute top-10 flex flex-col items-center justify-center">
          {/* Contador */}
          <div className="text-zinc-900 text-center mb-8">
            <h1 className="text-4xl font-bold">Tesla Model 3</h1>
            <p className="text-2xl mt-4 px-4">{formatTime(elapsedTime)}</p>
          </div>
        </div>
        {/* Botões */}
        <div className="flex justify-center items-center absolute bottom-16 w-full">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
            >
              Iniciar
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="px-5 py-2 bg-zinc-700 text-white font-semibold rounded-md"
            >
              Parar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
