import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Shield } from "lucide-react";

const About = () => (
  <div className="container max-w-3xl py-12">
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          We build simple, powerful tools that help you stay organized and productive every day.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: Zap, title: "Fast & Simple", desc: "Intuitive tools that just work, no learning curve required." },
          { icon: Shield, title: "Secure", desc: "Your data is encrypted and protected with enterprise-grade security." },
          { icon: Users, title: "For Everyone", desc: "Built for individuals and teams who value simplicity." },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title}>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default About;
