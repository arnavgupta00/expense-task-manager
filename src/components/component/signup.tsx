/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ashs6vo9uFQ
 */
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function signup() {
  return (
    <>
      <div>
        <Button variant="outline">Sign Up</Button>
      </div>
      <div className="z-40 w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
