import React, { useState , useEffect } from "react";
import './pagination.css'

const PaginationJSX = ({ dataLength , pageLimit, dataLimit }) => {

    const [pages] = useState(Math.round(dataLength / dataLimit));
   
    const [currentPage, setCurrentPage] = useState(1);
  
    const goToNextPage = () => {
       // not yet implemented
       setCurrentPage((page) => page + 1);
    }
  
    const goToPreviousPage = () => {
       // not yet implemented
       setCurrentPage((page) => page - 1);
    }
  
    const changePage = (event) => {
        // not yet implemented
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    const getPaginationGroup = () => {
        // not yet implemented
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    return (     
        <>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                
                {getPaginationGroup().map((item, index) => (
                    <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                    <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </>
    );
}

export default PaginationJSX