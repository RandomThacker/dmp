import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
    <AuroraBackground/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Welcome to postgresLM . Your query friend.
      </div>

      <div>
        <Button>Get Started</Button>
      </div>
    </main>
    </>
  );
}


