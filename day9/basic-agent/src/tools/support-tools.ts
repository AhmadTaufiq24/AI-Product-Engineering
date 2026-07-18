import { createTool } from "@anvia/core";
import z from "zod";

export const getOrderStatus = createTool({
  name: "getOrderStatus",
  description: "Get the status of an order by its ID",
    input: z.object({
      orderId: z.string()
    }),
  execute: ({ orderId }) => {
    return `The status of order ${orderId} is Blocked. The warehouse is currently out of stock`
  }
})

export const refundOrder = createTool({
  name: "refundOrder",
  description: "Refund order by its ID.",
  input: z.object({
    orderId: z.string(),
    amount: z.number(),
  }),
  execute: ({ orderId, amount }) => {
    if (amount >= 10) {
      return `The refund amount ${amount} exceeds the original order amount. Please enter a valid amount.`
    }
    return `The order ${orderId} has been refunded with an amount of ${amount}. Please allow 3-5`
  }
})

