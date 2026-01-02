import { Database, Brain, Zap, Shield, BarChart3, FileCode } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Database,
      title: "AI-Enhanced Real-Time Data Inference Indexer",
      description: "High-throughput indexer that ingests on-chain + off-chain feeds, cleans them, and updates AI models in real time.",
      features: [
        { icon: Zap, text: "Supports dynamic agent decisions for trading" },
        { icon: BarChart3, text: "Real-time monitoring and analytics" },
        { icon: Shield, text: "Automated security alerts and risk detection" },
      ],
      gradient: "from-primary via-primary/80 to-accent",
      bgGradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Brain,
      title: "Celo Fine-Tuned LLM",
      description: "A crypto- and Celo-optimized LLM fine-tuned on blockchain data, dev docs, and smart contracts.",
      features: [
        { icon: Shield, text: "Outputs on-chain verifiable results" },
        { icon: BarChart3, text: "Supports analytics and auditing" },
        { icon: FileCode, text: "Smart contract assistance and explanation" },
      ],
      gradient: "from-accent via-accent/80 to-cyan-light",
      bgGradient: "from-accent/10 to-accent/5",
    },
  ];

  return (
    <section id="products" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm text-primary font-medium tracking-wider uppercase mb-3 sm:mb-4 block">
            Core Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Two Powerful{" "}
            <span className="text-gradient-gold">Products</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Our infrastructure combines real-time data indexing with AI-powered 
            inference to give blockchain data meaning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className={`relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br ${product.bgGradient} backdrop-blur border border-border/30 h-full`}>
                {/* Icon */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 sm:mb-8 shadow-lg`}>
                  <product.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold mb-4 leading-tight">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3 sm:space-y-4">
                  {product.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/30 backdrop-blur border border-border/20 group-hover:border-border/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
                  <product.icon className="w-full h-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
