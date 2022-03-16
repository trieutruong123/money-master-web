import { ReactNode } from 'react';
interface IProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
