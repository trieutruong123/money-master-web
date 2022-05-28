import styled from './style/hypnosis.module.css';

interface HypnosisProps {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  duration?: string;
}

const HypnosisLoading: React.FC<
  HypnosisProps & React.HTMLProps<HTMLDivElement>
> = ({
  className = '',
  color = '#0d6efd',
  width = '4em',
  height = '4em',
  style,
  duration = '2s',
  ...others
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        {...others}
        style={{
          ...style,
          ['--width' as any]: width,
          ['--height' as any]: height,
          ['--color' as any]: color,
          ['--duration' as any]: duration,
        }}
        className={[styled.cssfxHypnosisLoader, className].join(' ')}
      >
        <div className={[styled.cssfxHypnosisOuter].join(' ')}></div>
        <div className={[styled.cssfxHypnosisMiddle].join(' ')}></div>
        <div className={[styled.cssfxHypnosisInner].join(' ')}></div>
      </div>
      <br />
      <h3 style={{ paddingLeft: '1rem',display: 'block' }}>Loading...</h3>
    </div>
  );
};

export default HypnosisLoading;
