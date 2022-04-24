import { Breadcrumbs, Link, Typography } from '@mui/material';

interface IProps {
  urlArr: Array<string>;
  displayNameArr: Array<string>;
  color?: string;
}

export const BreadcrumbsLink = ({ urlArr, displayNameArr, color }: IProps) => {
  const len = urlArr.length;
  return (
    <Breadcrumbs aria-label="breadcrumb" color={color}>
      {urlArr.map((item: string, index: number) => {
        if (index !== len - 1)
          return (
            <Link key={item} underline="hover" color="inherit" href="/">
              {displayNameArr[index]}
            </Link>
          );
      })}
      <Link
        underline="always"
        color="appColor.blue"
        href={urlArr[len - 1]}
        aria-current="page"
      >
        {displayNameArr[len - 1]}
      </Link>
    </Breadcrumbs>
  );
};
