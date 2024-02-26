import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function App() {
  return (
    <div className="login-main">
      <Card>
        <CardHeader>
          <CardTitle>EasyParty</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col">
          <div className="flex flex-col">
            <Label>Login</Label>
            <Input />
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}


