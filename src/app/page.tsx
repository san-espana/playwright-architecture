import React from "react";
import Link from "next/link";

// SVG icon placeholders
const Play = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><polygon points="5,3 19,12 5,21" fill="currentColor" /></svg>
);
const ExternalLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const FileText = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/></svg>
);
const Settings = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg>
);
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/></svg>
);
const Database = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/><path d="M21 5v6c0 1.657-4.03 3-9 3s-9-1.343-9-3V5" stroke="currentColor" strokeWidth="2"/><path d="M21 11v6c0 1.657-4.03 3-9 3s-9-1.343-9-3v-6" stroke="currentColor" strokeWidth="2"/></svg>
);
const Zap = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
);

// Utility function for className merging
function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Button component
function Button({ className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-green-500 text-black font-semibold text-lg py-4 shadow-lg",
        "hover:scale-105 hover:shadow-2xl hover:shadow-green-400/40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Card components
function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border bg-gray-900/80 text-card-foreground shadow-sm border-gray-700 transition-all duration-300 group", className)} {...props} />;
}
function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}
function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />;
}
function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export default function Home() {
  const documentationLinks = [
    {
      title: "Page Object Model",
      description: "Learn how to structure your tests with page object models for better maintainability",
      url: "https://playwright.dev/docs/pom",
      icon: FileText,
    },
    {
      title: "Fixtures",
      description: "Understand how to use fixtures to set up test environments and share data",
      url: "https://playwright.dev/docs/test-fixtures",
      icon: Settings,
    },
    {
      title: "Best Practices",
      description: "Follow proven patterns and practices for writing reliable tests",
      url: "https://playwright.dev/docs/best-practices",
      icon: Shield,
    },
    {
      title: "API Testing",
      description: "Test your APIs directly with Playwright's built-in request capabilities",
      url: "https://playwright.dev/docs/api-testing",
      icon: Database,
    },
    {
      title: "Mock APIs",
      description: "Learn how to mock network requests and responses for isolated testing",
      url: "https://playwright.dev/docs/mock",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-playwright-green/50 to-transparent" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                Welcome <span className="text-playwright-green">JBK</span> developers!
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Master Playwright Style & Architecture
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Dive into modern end-to-end testing with reliable, fast, and powerful automation tools
              </p>
            </div>
            <div className="pt-8 flex justify-center">
              <Link href="/playground" passHref>
                <Button>
                  <Play className="mr-2 h-5 w-5" />
                  Go to Testing Playground
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-playwright-green/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-playwright-green/10 rounded-full blur-2xl" />
        {/* Gradient divider */}
        <div className="absolute left-0 right-0 bottom-0 h-24 pointer-events-none" style={{zIndex:2}}>
          <div className="w-full h-full bg-gradient-to-b from-transparent to-green-900" />
        </div>
      </section>
      {/* Documentation Links Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Essential Playwright Resources</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to become proficient with Playwright testing patterns and best practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {documentationLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Card
                  key={index}
                  className="hover:border-playwright-green/80 hover:shadow-[0_0_0_3px_#2ECC71] border border-gray-700 group transition-all duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-playwright-green/10 rounded-lg group-hover:bg-playwright-green/20 transition-colors">
                        <IconComponent className="h-5 w-5 text-playwright-green" />
                      </div>
                      <CardTitle className="text-white text-lg group-hover:text-playwright-green transition-colors">
                        {link.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-400 mb-4 leading-relaxed">{link.description}</CardDescription>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-playwright-green hover:text-white transition-colors font-medium"
                    >
                      Learn more
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built for JBK developers • Powered by{" "}
            <Link
              href="https://playwright.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-playwright-green hover:text-white transition-colors"
            >
              Playwright
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
