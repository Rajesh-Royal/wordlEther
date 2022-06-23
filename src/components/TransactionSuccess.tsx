import { formatLargeStringsAddress } from "lib/format-large-address"
import { TxResultsInterface } from "./dapp/DappModal"

const TransactionSuccess = ({data}: {data: TxResultsInterface | undefined}) => {
  return (
    <>
      <h4 className="text-center text-green-500">Transaction Successful!</h4>
      <div className="grid grid-cols-2 gap-0 transaction-result">
        <div>
          <p>Tx Hash: </p>
          <p>From: </p>
          <p>Gas Used: </p>
          <p>Status: </p>
          <p>Stats Number: </p>
          <p>Block Number: </p>
          <p>Block Hash: </p>
        </div>
        <div>
          <p>{formatLargeStringsAddress(data?.transactionHash || "")}</p>
          <p>{formatLargeStringsAddress(data?.from || "")}</p>
          <p>{data?.gasUsed}</p>
          <p className="text-green-500">true</p>
          <p>{data?.events.ValueChanged.returnValues.contractUseCount}</p>
          <p>{data?.blockNumber}</p>
          <p>{formatLargeStringsAddress(data?.blockHash || "")}</p>
        </div>
      </div>
    </>
  )
}

export default TransactionSuccess