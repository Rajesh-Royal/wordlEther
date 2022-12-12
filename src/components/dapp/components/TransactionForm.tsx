import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { KeyButton } from "components/Keyboard";
import { useFormik } from "formik";
import { initiateTransaction, UserGameStatsInterFace } from "lib/validator";
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { GamePlayerStatsValidationSchema } from "schema/GamePlayerStatsValidationSchema";
import { useStatsStore } from "stores/stats";
import { TxResultsInterface } from "../DappModal";
const uniqueId = nanoid();

export const Processing = () => {
  return (
    <p className="flex align-middle">
      <svg className="animate-spin -ml-1 mt-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    </p>
  )
}

const TransactionForm = ({ setSteps, setTxResults }: { setSteps: Dispatch<SetStateAction<"connect" | "userDetails" | "success" | "failed">>, setTxResults: Dispatch<SetStateAction<TxResultsInterface | undefined>> }) => {
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

  const [loading, setLoading] = useState(false);

  const transactionFormFormik = useFormik<UserGameStatsInterFace>({
    initialValues: {
      id: uniqueId,
      gamePlayed: totalPlayed,
      winPercentage: parseInt((!state.wins ? 0 : (state.wins / totalPlayed) * 100).toFixed(0)),
      currentStreak: state.currentStreak,
      maxStreak: state.maxStreak,
      Tries: state.distribution.map((value) => value),
      playerName: "",
      description: ""
    },
    validationSchema: GamePlayerStatsValidationSchema,
    onSubmit: (values) => {
      setTxResults(undefined);
      setLoading(true);
      initiateTransaction(account as string, chainId, connector, values).then((response) => {
        setTxResults(response as TxResultsInterface);
        setLoading(false)
        setSteps("success")
      }).catch((error: any) => {
        setSteps("failed")
        setLoading(false);
        // setTxResults(error);
      })
    }
  });
  const { errors, setFieldValue, values, handleSubmit } = transactionFormFormik;

  const updateInputValues = (e: { target: string, value: string }) => {
    setFieldValue(e.target, e.value)
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
        <input type="text" name="playerName" placeholder="Enter Player Name" className={inputStyle} onChange={(e) => updateInputValues({ target: e.target.name, value: e.target.value })} value={values.playerName} disabled={loading} />
        <textarea name="description" rows={4} placeholder="Write Game Description" className={inputStyle} onChange={(e) => updateInputValues({ target: e.target.name, value: e.target.value })} value={values.description} disabled={loading} />
      </div>
      <div className="text-center">
        <KeyButton onClick={() => handleSubmit()} disabled={loading || state.maxStreak === 0}>{loading ? <Processing /> : "Create Transaction"}</KeyButton>
      </div>
    </div>
  )
}

export default TransactionForm