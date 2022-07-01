interface ISvgIconProps{
    src:string;
    width:string;
    height:string;
}

export const SvgIcon = ({ src, width, height }: ISvgIconProps) => (
    <img src={`/${src}`} alt={src} width={width} height={height} />
  );
  