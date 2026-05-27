import { useEffect, useState } from "react";

export function usePersonagem() {

  const [saude, setSaude] = useState(() => {
    return Number(localStorage.getItem("saude")) || 100;
  });

  useEffect(() => {
    localStorage.setItem("saude", saude);
  }, [saude]);

  function alterarSaude(valor) {

    setSaude((prev) => {

      const novaSaude = prev + valor;

      if (novaSaude > 100) return 100;
      if (novaSaude < 0) return 0;

      return novaSaude;
    });
  }

  return {
    saude,
    alterarSaude
  };
}