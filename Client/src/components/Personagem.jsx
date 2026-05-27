function Personagem({ saude }) {

  if (saude > 70) {
    return (
      <div className="text-center">
        <h1 className="text-8xl">💪</h1>
        <h2 className="text-3xl text-green-400 font-bold">
          FIT
        </h2>
      </div>
    );
  }

  if (saude > 40) {
    return (
      <div className="text-center">
        <h1 className="text-8xl">🙂</h1>
        <h2 className="text-3xl text-yellow-400 font-bold">
          NORMAL
        </h2>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-8xl">🍔</h1>
      <h2 className="text-3xl text-red-400 font-bold">
        GORDO
      </h2>
    </div>
  );
}

export default Personagem;