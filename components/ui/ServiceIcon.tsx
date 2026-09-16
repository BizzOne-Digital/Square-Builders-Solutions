import {
  Hammer,
  Wind,
  ChefHat,
  Bath,
  Home,
  PaintRoller,
  Layers,
  Wrench,
  Building2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Hammer,
  Wind,
  ChefHat,
  Bath,
  Home,
  PaintRoller,
  Layers,
  Wrench,
  Building2,
  ShieldCheck,
};

export default function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] || Hammer;
  return <Icon className={className} aria-hidden="true" />;
}

export { ICON_MAP };
