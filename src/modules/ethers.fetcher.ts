import axios from "axios"

export const ETHERSCAN_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJhMGYwZDNjLWFlMGItNDU3Yi04ZmY2LTY3Yjk3ZTg2N2Q5YyIsIm9yZ0lkIjoiNDU3Mzc4IiwidXNlcklkIjoiNDcwNTc3IiwidHlwZUlkIjoiZjUwMzlhNDYtZjY0Zi00ZTI3LTg1OWMtOWVlZTA1YmM2OTUyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTE1ODk3NzYsImV4cCI6NDkwNzM0OTc3Nn0.N_yrVA_7a9SvYKHN4NEuWe9uuJZszSYFwBAaQwjx9zs"
const CONTRACT = "0x8cC41583E1Bf4f3Ee08e7EdC21AeCD6833929F6b"

export interface Holders {
  balance: string
  balance_formatted: string
  entity: string | null
  entity_logo: string | null
  is_contract: boolean
  owner_address: string
  owner_address_label: string | null
  percentage_relative_to_total_supply: number
  usd_value: string
  reward: string
}

export async function fetchHolders(): Promise<any> {
  const url = `https://deep-index.moralis.io/api/v2.2/erc20/${CONTRACT}/owners?chain=eth&limit=25&order=DESC`

  return await axios.get(url, {
    headers: {
      "X-API-Key": ETHERSCAN_API_KEY,
    },
  })
}
