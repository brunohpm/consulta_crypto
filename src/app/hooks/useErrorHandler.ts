import { useCallback } from "react";
export interface ErrorInfo {
  type: "network" | "api" | "unknown";
  message: string;
  originalError?: Error;
}
export function useErrorHandler() {
  const handleError = useCallback((error: unknown): ErrorInfo => {
    console.error("Error occurred:", error);
    if (error instanceof Error) {
      // Erro de rede
      if (
        error.message.includes("fetch") ||
        error.message.includes("network")
      ) {
        return {
          type: "network",
          message: "Erro de conexão com a internet",
          originalError: error,
        };
      }
      // Erro da API
      if (error.message.includes("API") || error.message.includes("server")) {
        return {
          type: "api",
          message: "Erro no servidor da API",
          originalError: error,
        };
      }
      // Erro genérico
      return {
        type: "unknown",
        message: error.message || "Ocorreu um erro inesperado",
        originalError: error,
      };
    }
    // Erro desconhecido
    return {
      type: "unknown",
      message: "Ocorreu um erro inesperado",
    };
  }, []);
  return { handleError };
}
