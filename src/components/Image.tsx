import NextImage from "next/image";

interface TodoImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const TodoImage = ({ src, alt, width, height }: TodoImageProps) => {
  return (
    <div className="relative w-full h-full">
      <NextImage src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default TodoImage;
