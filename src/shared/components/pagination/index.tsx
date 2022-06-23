 import { useEffect, useState } from 'react';
 import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
 import ArrowRightIcon from '@mui/icons-material/ArrowRight';
 import styled from  './style/index.module.css'
 

 interface IProps{
  currentPage:number;
  pageNumbers:Array<number>;
  handleCurrentPage: Function;
 }

 const Pagination:React.FunctionComponent<IProps> = (props:IProps)=>{
    const [pageNumbers,setPageNumbers]  = useState<Array<number>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const{handleCurrentPage} = props;

    useEffect(()=>{
        setPageNumbers(props.pageNumbers);
        setCurrentPage(props.currentPage);
    },[])

    const onPageSelectionChanged = (pageNumber:number)=>{
        setCurrentPage (pageNumber);
        handleCurrentPage(pageNumber);
    }

    return (
    <nav className={`${styled.sweetPagination} ${styled.contentCenter}`}>
      <button className = {styled.arrowButton}>
        <ArrowLeftIcon fontSize = 'large'  className = {styled.arrowIcon}/>
      </button>
      <ul className={styled.paginationUL}>
        {pageNumbers.map((number,index) => (
          <li key={number} className={styled.pageItem}>
            <button
              onClick={() => onPageSelectionChanged(number)}
              className={
                currentPage === number
                  ? `${styled.pageButton} ${styled.activeButton} ${styled.commonButtonStyle}`
                  : `${styled.pageButton} ${styled.commonButtonStyle} `
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button className = {styled.arrowButton}>
        <ArrowRightIcon fontSize = 'large' className = {styled.arrowIcon}/>
      </button>
  </nav>)

}

export default Pagination;