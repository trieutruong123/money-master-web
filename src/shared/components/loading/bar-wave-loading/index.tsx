import styled from 'style/index.module.css';

interface BarWaveProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  duration?: string;
}

const BarWaveLoading: React.FC<BarWaveProps & React.HTMLProps<HTMLDivElement>> = ({
  className = '',
  color = '#0d6efd',
  width = '2em',
  height = '1em',
  style,
  duration = '1s',
  ...others
}) => {
  return (
    <div style={{display:'flex',justifyContent:'center', alignItems:'center' }}>
      <div
        {...others}
        style={{
          ...style,
          ['--width' as any]: width,
          ['--height' as any]: height,
          ['--color' as any]: color,
          ['--duration' as any]: duration,
        }}
        className={`cssfxBarWave ${className}`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <br />
      <h4 style={{ display: 'block' }}>Loading...</h4>
    </div>
  );
};

export default BarWaveLoading;
