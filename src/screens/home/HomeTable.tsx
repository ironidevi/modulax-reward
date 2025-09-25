import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Holders } from "@/modules/ethers.fetcher"
import React, { useEffect } from "react"
import { ethers } from "ethers"

const provider = new ethers.JsonRpcProvider("https://rpc.modulax.org")

const HomeTable = ({ data }: { data: Holders[] }) => {
  const [listData, setListData] = React.useState<Holders[]>(data)

  const handleGetRewards = async (data: Holders[]) => {
    const list: Holders[] = []
    for (const addr of data) {
      console.log("addr", addr.owner_address)
      const balance = await provider.getBalance(addr.owner_address)
      console.log("balance", ethers.formatEther(balance))
      list.push({
        ...addr,
        reward: ethers.formatEther(balance),
      })
    }
    setListData(list)
  }

  useEffect(() => {
    if (data.length > 0) {
      handleGetRewards(data)
    }
  }, [data])

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Address</TableHead>
          <TableHead>Held</TableHead>
          <TableHead className="text-right">Rewards</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listData.map((holder) => (
          <TableRow key={holder.owner_address}>
            <TableCell className="font-medium">
              {`${holder.owner_address.slice(
                0,
                6
              )}...${holder.owner_address.slice(-4)}`}
            </TableCell>
            <TableCell>{holder.balance_formatted}</TableCell>
            <TableCell className="text-right">{holder.reward} MDX</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  )
}

export default HomeTable
