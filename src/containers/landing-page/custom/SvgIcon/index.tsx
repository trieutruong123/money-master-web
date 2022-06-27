interface SvgIconProps {
  src: string;
  width: string;
  height: string;
}

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={`/img/svg/${src}`} alt={src} width={width} height={height} />
);
