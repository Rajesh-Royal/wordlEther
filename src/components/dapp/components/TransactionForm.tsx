import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { KeyButton } from "components/Keyboard";
import { useMemo, useState } from "react";
import { useStatsStore } from "stores/stats";

const TransactionForm = () => {
  const { account, chainId, connector } = useWeb3React<Web3Provider>();

   const { state } = useStatsStore();
  
  const totalPlayed = state.wins + state.losses;

  const stats = useMemo(
    () => [
      {
        label: "Played",
        value: totalPlayed,
      },
      {
        label: "Win %",
        value: (!state.wins ? 0 : (state.wins / totalPlayed) * 100).toFixed(0),
      },
      {
        label: "Current Streak",
        value: state.currentStreak,
      },
      {
        label: "Max Streak",
        value: state.maxStreak,
      },
    ],
    [state.currentStreak, state.maxStreak, state.wins, totalPlayed]
  );

  const [txResult, setTxResult] = useState<any>();
  const [txSuccess, setTxSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const executeTransaction = () => {
    setTxResult(null);
    setLoading(true);
    if (true) {
      //   initiateTransaction(account as string, chainId, connector, {}).then((response) => {
      //     setTxResult(JSON.stringify(response,  undefined, 2));
      //     setLoading(false)
      //     setTxSuccess(true);
      //   }).catch((error) => {
      //   console.log('error', error)
      //     setTxSuccess(false)
      //     setLoading(false);
      //     setTxResult(JSON.stringify(error,  undefined, 2));
      // })
    }
  }

  const inputStyle = `p-2 text-gray-600 dark:text-white bg-slate-200 dark:bg-slate-700 border-none outline-none`
  return (
    <div className="grid min-h-[20vh] w-full gap-8 pb-4">
        <div className="flex w-full gap-2 text-black">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="grid flex-1 place-items-center gap-2 rounded-lg bg-slate-200 p-2 px-3 text-center dark:bg-slate-700"
            >
              <div className="text-sm font-bold text-gray-600 dark:text-white">
                {stat.label}
              </div>
              <div className="dark:text-slate-100">{stat.value}</div>
            </div>
          ))}
      </div>
      <div className="flex flex-col w-full gap-2">
        <input type="text" name="playerName" placeholder="Enter Player Name" className={inputStyle} />
        <textarea name="description" rows={4} placeholder="Write Game Description" className={inputStyle} />
      </div>
      <div className="text-center">
        <KeyButton>Create Transaction</KeyButton>
      </div>
      </div>
  )
}

export default TransactionForm