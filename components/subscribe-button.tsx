"use client"

import { Button } from "@/components/ui/button"
import { subscribeToPlan } from "@/app/actions/subscription"
import { useActionState } from "react"

interface SubscribeButtonProps {
  plan: "basic" | "premium" | "family"
  currentPlan?: "basic" | "premium" | "family"
  variant?: "default" | "outline"
}

export function SubscribeButton({ plan, currentPlan, variant = "default" }: SubscribeButtonProps) {
  const [state, formAction, isPending] = useActionState(subscribeToPlan, undefined)

  const isCurrent = currentPlan === plan
  const isUpgrade = currentPlan && getPlanLevel(plan) > getPlanLevel(currentPlan)
  const isDowngrade = currentPlan && getPlanLevel(plan) < getPlanLevel(currentPlan)

  let buttonText = "Subscribe"
  if (isCurrent) buttonText = "Current Plan"
  else if (isUpgrade) buttonText = "Upgrade"
  else if (isDowngrade) buttonText = "Downgrade"

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="plan" value={plan} />
      {state?.error && <p className="text-sm text-destructive mb-2">{state.error}</p>}
      <Button type="submit" className="w-full" variant={variant} disabled={isPending || isCurrent}>
        {isPending ? "Processing..." : buttonText}
      </Button>
    </form>
  )
}

function getPlanLevel(plan: string): number {
  const levels: Record<string, number> = {
    basic: 1,
    premium: 2,
    family: 3,
  }
  return levels[plan] || 0
}
