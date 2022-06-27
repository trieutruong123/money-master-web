import { CustomNavLinkSmall, Span } from './styles';
import { Button } from '../custom/Button';

interface IProps {
  closeDrawer: Function;
}

const MenuItem = ({ closeDrawer }: IProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: 'smooth',
    });
    closeDrawer();
  };
  return (
    <>
      <CustomNavLinkSmall onClick={() => scrollTo('about')}>
        <Span>About</Span>
      </CustomNavLinkSmall>
      <CustomNavLinkSmall onClick={() => scrollTo('mission')}>
        <Span>Mission</Span>
      </CustomNavLinkSmall>
      <CustomNavLinkSmall onClick={() => scrollTo('product')}>
        <Span>Product</Span>
      </CustomNavLinkSmall>
      <CustomNavLinkSmall
        style={{ width: '180px' }}
        onClick={() => scrollTo('contact')}
      >
        <Span>
          <Button>Contact</Button>
        </Span>
      </CustomNavLinkSmall>
    </>
  );
};

export default MenuItem;
