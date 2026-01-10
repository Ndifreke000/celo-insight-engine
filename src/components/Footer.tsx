import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative">
      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Give Your AI{" "}
              <span className="text-gradient-gold">Sight?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              The next generation of crypto isn't users clicking buttons—it's AI agents 
              making decisions. Those agents are currently blind. Sentinel-X gives them sight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
              <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                Get API Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="border-t border-border/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-base sm:text-lg">S</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-foreground">
                  Sentinel<span className="text-gradient-gold">-X</span>
                </span>
              </a>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Giving blockchain data a brain.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-border/50 gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © 2026 Sentinel-X. Built on Celo.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
