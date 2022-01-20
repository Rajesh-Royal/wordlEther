import Head from "next/head";
import { useCallback, useEffect } from "react";

import { useGameStore } from "stores/game";
import Header from "components/Header";
import Grid from "components/Grid";
import Keyboard, { isMappableKey } from "components/Keyboard";

export default function Home() {
  const { state, actions } = useGameStore();

  useEffect(() => {
    actions.init();
  }, [actions]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isMappableKey(key)) {
        switch (key) {
          case "backspace":
            actions.delete();
            break;
          case "enter":
            actions.reveal();
            break;
        }
        return;
      }
      actions.insert(key);
    },
    [actions]
  );

  return (
    <div className="flex flex-col max-w-lg w-full m-auto min-h-screen">
      <Head>
        <title>React Wordle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1 p-4 flex flex-col justify-between">
        <Grid data={state.grid} />
        <Keyboard disabled={state.isLoading} onKeyPress={handleKeyPress} />
      </main>
    </div>
  );
}
