import Scanner from "./components/Scanner";
import Personagem from "./components/Personagem";
import { usePersonagem } from "./hooks/UsePersonagens";

function App() {

  const { saude, alterarSaude } = usePersonagem();

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center gap-6 pt-10">

      <h1 className="text-4xl font-bold text-green-400">
        NutriScan
      </h1>

      <Personagem saude={saude} />

      <div className="w-80 h-6 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            saude > 50
              ? "bg-green-500"
              : "bg-red-500"
          }`}
          style={{
            width: `${saude}%`
          }}
        />
      </div>

      <h2 className="text-2xl">
        Saúde: {saude}
      </h2>

      <Scanner
        onResultado={(impacto) => {
          alterarSaude(impacto);
        }}
      />

    </div>
  );
}

export default App;