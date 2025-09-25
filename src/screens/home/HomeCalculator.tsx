import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ethers } from "ethers"
import { useMutation } from "@tanstack/react-query"

const provider = new ethers.JsonRpcProvider("https://rpc.modulax.org")
const formSchema = z.object({
  address: z.string().min(1, {
    message: "Address is required",
  }),
})

const HomeCalculator = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  })

  const handleGetRewards = async (address: string) => {
    try {
      const balance = await provider.getBalance(address)
      return ethers.formatEther(balance)
    } catch (error) {
      throw error
    }
  }

  const mutationHandler = useMutation({
    mutationFn: handleGetRewards,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutationHandler.reset()

    // Check is valid Ethereum address
    const isValidAddress = ethers.isAddress(values.address)
    if (!isValidAddress) {
      alert("Invalid Ethereum address")
      return
    }

    mutationHandler.mutate(values.address, {
      onSuccess: (data) => {},
      onError: (error: any) => {},
    })
  }

  return (
    <Form {...form}>
      <div className="flex items-center max-w-md w-full flex-col gap-4 bg-brand-blue/10 p-4 rounded-lg border-brand-blue border-[0.5px]">
        <div className="w-full">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    variant="border"
                    placeholder="Enter your wallet address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your ERC-20 MDX balance</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          size={"sm"}
          onClick={form.handleSubmit(onSubmit)}
        >
          Calculate Rewards
        </Button>
        <div className="flex flex-col items-center justify-center">
          {mutationHandler.isPending && <p>Calculating...</p>}
          {mutationHandler.isError && <p>Error calculating rewards.</p>}
          {mutationHandler.isSuccess && (
            <p>Your MDX Rewards: {mutationHandler.data} MDX</p>
          )}
        </div>
        <div className="text-xs text-gray-500 italic">
          * Rewards are calculated based on your current MDX balance.
        </div>
      </div>
    </Form>
  )
}

export default HomeCalculator
