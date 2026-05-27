import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";

function Scanner({ onResultado }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    async function iniciarScanner() {
      try {
        // Pega os dispositivos disponíveis primeiro
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const deviceId = devices[0]?.deviceId; // pega a primeira câmera

        controlsRef.current = await codeReader.decodeFromVideoDevice(
          deviceId,        // <-- deviceId explícito, não undefined
          videoRef.current, // <-- referência direta ao elemento, não string "video"
          async (result, err) => {
            if (result) {
              const codigo = result.getText();
              console.log("Código:", codigo);

              try {
                const response = await fetch(
                  `http://localhost:8080/nutribuddy/${codigo}`
                );
                const data = await response.json();
                onResultado(data.impacto);
              } catch (error) {
                console.log(error);
              }
            }
          }
        );
      } catch (error) {
        console.error("Erro ao iniciar scanner:", error);
      }
    }

    iniciarScanner();

    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}       //{/* <-- ref em vez de id */}
        className="w-80 rounded-2xl border-4 border-green-500"
      />
      <p className="text-zinc-400">Escaneie um código de barras</p>
    </div>
  );
}

export default Scanner;