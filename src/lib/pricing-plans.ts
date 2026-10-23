export const PRICING_PLANS = [
  {
    key: "basic",
    title: "Basic",
    description: "Start with essential features for simple needs.",
    price: { monthly: "$19 / month", yearly: "$182 / year" },
    features: [
      "Host a set number of meetings each month.",
      "Exported content will include a watermark.",
      "Perfect for individuals or small teams just getting started.",
    ],
  },
  {
    key: "premium",
    title: "Premium",
    description: "Complete tools for teams that need more flexibility.",
    price: { monthly: "$32 / month", yearly: "$307 / year" },
    features: [
      "Unlimited meetings and detailed summaries to keep everyone aligned.",
      "Multi-language support for global collaboration without barriers.",
      "Exported content comes clean, with no watermark.",
      "Best for growing teams that need advanced features at an affordable price.",
    ],
  },
  {
    key: "custom",
    title: "Custom (Enterprise)",
    description: "Tailored solutions with security and priority support.",
    price: { monthly: "Contact us", yearly: "Contact us" },
    features: [
      "Single Sign-On (SSO) integration to simplify and secure team access.",
      "Enterprise-grade compliance to meet organizational standards.",
      "Priority support with faster response times and dedicated assistance.",
      "Ideal for large companies or organizations with advanced needs.",
    ],
  },
];
