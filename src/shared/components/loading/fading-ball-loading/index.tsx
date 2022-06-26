import styled from './style/index.module.css';

interface FadingBallsProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  duration?: string;
}

const FadingBallsLoading: React.FC<
  FadingBallsProps & React.HTMLProps<HTMLDivElement>
> = ({
  className = '',
  color = '#0d6efd',
  width = '0.8em',
  height = '0.8em',
  style,
  duration = '0.8s',
  ...others
}) => {
  return (
    <>
      <div
        {...others}
        style={{
          ...style,
          ['--width' as any]: width,
          ['--height' as any]: height,
          ['--color' as any]: color,
          ['--duration' as any]: duration,
        }}
        className={[styled.cssfxFadingBalls,className].join(' ')}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <br />
      <h4 style={{ display: 'block' }}>Loading...</h4>
    </>
  );
};

export default FadingBallsLoading;
