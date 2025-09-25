/* eslint-disable @next/next/no-img-element */
"use client"

import { fetchHolders, Holders } from "@/modules/ethers.fetcher"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import React, { useEffect } from "react"
import HomeTable from "./HomeTable"
import HomeCalculator from "./HomeCalculator"

const HomeScreen = () => {
  const filterQuery = useQuery({
    queryKey: [],
    queryFn: () => fetchHolders(),
    refetchOnWindowFocus: false,
    retry: 3,
    enabled: true,
  })

  const renderData = (query: UseQueryResult<any, Error>) => {
    if (query.isLoading) {
      return <div>Loading...</div>
    }

    if (query.isError) {
      return <div>Error fetching data</div>
    }

    if (query.data) {
      if (query.data.data && (query.data.data.result as Holders[])) {
        const filteredData = query.data.data.result.filter(
          (holder: Holders) => !holder.is_contract
        )

        return <HomeTable data={filteredData} />
      }

      return <div>Data fetched successfully</div>
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 p-4 items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-4">
        <img className="w-12" src="/logo-name.png" alt="" />
        <h1 className="text-2xl font-bold text-brand">MODULAX REWARDS</h1>
      </div>
      <p className="text-center text-lg text-brand-blue">
        TOP GAINER LEADERBOARD
      </p>
      <div className="h-4"></div>
      <HomeCalculator />
      <div className="h-4"></div>
      {renderData(filterQuery)}
    </div>
  )
}

export default HomeScreen
