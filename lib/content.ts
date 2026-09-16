export const MAIN_SERVICES = [
  {
    slug: "roofing",
    title: "Roofing",
    icon: "Home",
    description:
      "Full roof replacements, repairs, and inspections built to withstand Florida's toughest weather.",
    bullets: [
      "Roof replacement & new roof installation",
      "Roof repair & storm damage restoration",
      "Roof inspections & maintenance plans",
      "Shingle, tile, and metal roofing systems",
      "Commercial flat & low-slope roofing",
    ],
    image: "/ser1.png",
  },
  {
    slug: "hvac",
    title: "HVAC",
    icon: "Wind",
    description:
      "Heating and cooling systems installed and maintained for year-round comfort and efficiency.",
    bullets: [
      "AC installation & full system replacement",
      "Heating & cooling repair",
      "Preventative maintenance plans",
      "Ductwork design & installation",
      "Indoor air quality solutions",
    ],
    image: "/ser2.png",
  },
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    icon: "ChefHat",
    description:
      "Full kitchen transformations, from layout planning to cabinetry, countertops, and finishes.",
    bullets: [
      "Custom cabinetry & countertops",
      "Layout redesign & space planning",
      "Flooring, lighting & fixtures",
      "Backsplash & tile installation",
      "Appliance integration",
    ],
    image: "/ser3.png",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    icon: "Bath",
    description:
      "Beautiful, functional bathroom renovations for full remodels or targeted updates.",
    bullets: [
      "Full bathroom renovations",
      "Custom showers & tubs",
      "Vanities, countertops & fixtures",
      "Tile, flooring & waterproofing",
      "Accessibility & aging-in-place upgrades",
    ],
    image: "/ser4.png",
  },
] as const;

export const ADDITIONAL_CAPABILITIES = [
  { title: "Custom Cabinetry", icon: "Layers" },
  { title: "Concrete & Epoxy Flooring", icon: "Building2" },
  { title: "Stucco", icon: "Wrench" },
  { title: "Siding", icon: "Home" },
  { title: "Interior & Exterior Painting", icon: "PaintRoller" },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We start by listening. A member of our team will discuss your goals, timeline, and budget to understand exactly what you need.",
  },
  {
    number: "02",
    title: "Project Assessment",
    description:
      "We evaluate your property in person, identify the scope of work, and outline the materials and approach best suited to your project.",
  },
  {
    number: "03",
    title: "Customized Solution",
    description:
      "We build a clear, detailed plan tailored to your property and priorities — no generic packages, no surprises.",
  },
  {
    number: "04",
    title: "Professional Execution",
    description:
      "Our team completes the work with skilled craftsmanship, clear communication, and respect for your property throughout.",
  },
  {
    number: "05",
    title: "Final Review",
    description:
      "We walk the finished project with you to confirm every detail meets our standards — and yours — before we call it complete.",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    icon: "ShieldCheck",
    title: "15+ Years of Experience",
    description:
      "Over a decade and a half of hands-on experience across roofing, HVAC, and remodeling projects.",
  },
  {
    icon: "Wrench",
    title: "Skilled Craftsmanship",
    description:
      "Every project is completed with attention to detail and a commitment to lasting quality.",
  },
  {
    icon: "Building2",
    title: "Residential & Commercial",
    description:
      "We serve homeowners and business owners alike, scaling our approach to fit each property.",
  },
  {
    icon: "Home",
    title: "Locally Rooted in Davenport, FL",
    description:
      "We know Central Florida properties and weather, and we're proud to serve our neighbors.",
  },
] as const;
