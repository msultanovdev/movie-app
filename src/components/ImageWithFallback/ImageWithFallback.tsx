import { ImgHTMLAttributes, FC } from "react";

interface IImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
}

const defaultFallback =
  "https://plus.unsplash.com/premium_photo-1710961232986-36cead00da3c?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ImageWithFallback: FC<IImageWithFallbackProps> = ({
  src,
  fallback = defaultFallback,
  alt,
  ...props
}) => {
  // const [imgSrc, setImgSrc] = useState(src);

  // useEffect(() => {
  //   // setImgSrc(src);
  // }, [src]);

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      // onError={() => setImgSrc(fallback)}
    />
  );
};

export default ImageWithFallback;
