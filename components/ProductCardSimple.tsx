import Image from "next/image";

type Tag = "Nuevo" | "Caliente";

const tagStyles: Record<Tag, string> = {
  Nuevo: "bg-neutral-900 text-white",
  Caliente: "bg-[#D4483A] text-white",
};

interface ProductCardSimpleProps {
  title: string;
  image: string;
  price: number;
  tag?: Tag;
}

export default function ProductCardSimple({
  title,
  image,
  price,
  tag,
}: ProductCardSimpleProps) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-neutral-100">
        {tag && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${tagStyles[tag]}`}
          >
            {tag}
          </span>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
        <span className="text-sm font-semibold text-neutral-900">
          ${price.toLocaleString("es-MX")}
        </span>
      </div>
    </div>
  );
}