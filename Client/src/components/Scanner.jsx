import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect } from "react";

function Scanner({ onResultado }) {

  useEffect(() => {

    const codeReader = new BrowserMultiFormatReader();

    let controls;

    async function iniciarScanner() {

      try {

        controls = await codeReader.decodeFromVideoDevice(
          undefined,
          "video",
          async (result, err) => {

            if (result) {

              const codigo = result.getText();

              console.log("Código:", codigo);

              try {

                const response = await fetch(
                  `http://localhost:8080/nutribuddy/${codigo}`
                );

                const data = await response.json();

                console.log(data);

                onResultado(data.impacto);

              } catch (error) {
                console.log(error);
              }
            }

            if (err) {
              console.log(err);
            }
          }
        );

      } catch (error) {
        console.log(error);
      }
    }

    iniciarScanner();

    return () => {
      controls?.stop();
    };

  }, []);

  return (
    <div className="flex flex-col items-center gap-4">

      <video
        id="video"
        className="w-80 rounded-2xl border-4 border-green-500"
      />

      <p className="text-zinc-400">
        Escaneie um código de barras
      </p>

    </div>
  );
}

export default Scanner;