import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function PhoneFrame({ src, alt, priority = false }: PhoneFrameProps) {
  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={1242}
        height={2688}
        className="w-full h-auto block"
        loading={priority ? undefined : "lazy"}
        priority={priority}
      />
    </div >
  );
}
