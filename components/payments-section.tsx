"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface PaymentProvider {
  id: string
  name: string
  description: string
  icon: string
  supported: boolean
}

const PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Global payments processing",
    icon: "🔵",
    supported: true,
  },
  {
    id: "pawapay",
    name: "Pawapay",
    description: "Mobile money & digital payments for Africa",
    icon: "🌍",
    supported: true,
  },
  {
    id: "payoneer",
    name: "Payoneer",
    description: "Global money transfer & payments",
    icon: "💳",
    supported: true,
  },
  {
    id: "airtel-money",
    name: "Airtel Money",
    description: "Mobile money service",
    icon: "📱",
    supported: true,
  },
  {
    id: "mtn",
    name: "MTN Mobile Money",
    description: "MTN digital wallet",
    icon: "📲",
    supported: true,
  },
]

export function PaymentsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Payment Methods</h2>
        <p className="text-muted-foreground">Choose your preferred payment provider</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAYMENT_PROVIDERS.map((provider) => (
          <Card key={provider.id} className={!provider.supported ? "opacity-50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{provider.icon}</span>
                  <div>
                    <CardTitle>{provider.name}</CardTitle>
                    <CardDescription>{provider.description}</CardDescription>
                  </div>
                </div>
                {provider.id === "pawapay" && <Badge className="bg-green-600">New</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {provider.id === "pawapay"
                  ? "Support for African mobile money operators including M-Pesa, Orange Money, AirtelMoney and more."
                  : `Pay securely using ${provider.name}`}
              </p>
            </CardContent>
            <CardFooter>
              <Button disabled={!provider.supported} className="w-full">
                {provider.supported ? "Pay with " + provider.name : "Coming Soon"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Pawapay Integration</h3>
        <p className="text-sm text-muted-foreground">
          Pawapay connects to 200+ mobile operators globally, enabling payments via M-Pesa, Orange Money, Airtel Money,
          Vodacom M-Pesa, and many more. Perfect for serving customers across Africa and emerging markets.
        </p>
      </div>
    </div>
  )
}
