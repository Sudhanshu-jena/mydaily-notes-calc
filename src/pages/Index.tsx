import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, StickyNote, UserCircle, ArrowRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container flex flex-col items-center justify-center py-24 text-center">
        <div className="animate-fade-in max-w-2xl space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Your personal <span className="text-primary">productivity hub</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Notes, calculator, and more — all in one clean, simple app. Sign up free and start organizing your day.
          </p>
          {user ? (
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/notes">
                  <StickyNote className="mr-2 h-5 w-5" /> My Notes
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/calculator">
                  <Calculator className="mr-2 h-5 w-5" /> Calculator
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: StickyNote, title: "Daily Notes", desc: "Create, edit, and organize your notes with ease." },
              { icon: Calculator, title: "Calculator", desc: "A clean calculator for quick math on the go." },
              { icon: UserCircle, title: "Your Profile", desc: "Manage your account and personalize your experience." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center space-y-3 animate-fade-in">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
