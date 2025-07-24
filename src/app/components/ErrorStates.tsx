import { AlertTriangle, RefreshCw, Wifi, Search } from "lucide-react";
interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
  icon?: React.ReactNode;
}
export function ErrorMessage({
  title,
  message,
  onRetry,
  icon,
}: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon || <AlertTriangle className="h-12 w-12 text-red-500" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white
rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2
focus:ring-blue-500 focus:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar Novamente
        </button>
      )}
    </div>
  );
}
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorMessage
      title="Erro de Conexão"
      message="Não foi possível conectar com o servidor. Verifique sua conexão
com a internet e tente novamente."
      onRetry={onRetry}
      icon={<Wifi className="h-12 w-12 text-red-500" />}
    />
  );
}
export function ApiError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorMessage
      title="Erro no Servidor"
      message="Ocorreu um erro ao buscar os dados das criptomoedas. Tente
novamente em alguns instantes."
      onRetry={onRetry}
    />
  );
}
export function SearchNoResults() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Nenhum resultado encontrado
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Tente buscar por outro nome ou símbolo de criptomoeda.
      </p>
    </div>
  );
}
export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Nenhum dado disponível
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Não há dados de criptomoedas para exibir no momento.
      </p>
    </div>
  );
}
