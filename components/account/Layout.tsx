// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// import { userService } from 'services';

export { Layout };

interface IProps {
  children: any;
}

function Layout({ children }: IProps) {
  // const router = useRouter();

  // useEffect(() => {
  //     if (userService.userValue) {
  //         router.push('/');
  //     }
  // }, []);

  return <div className="col-md-6 offset-md-3 mt-5">{children}</div>;
}
