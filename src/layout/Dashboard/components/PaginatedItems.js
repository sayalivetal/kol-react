import React, { useEffect, useState } from "react";
import { getKolAllAnnouncements } from "../../../slices/api/simpleApi";
import { announceDelete } from "../../../slices/Dashboard/dashboard";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import AnnouncementsItems from "./AnnouncementsItems";


const PaginatedItems = ({ itemsPerPage }) => {
  //  console.log(itemsPerPage);

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [announcements, setAnnouncements] = useState([]);
  //  console.log(announcements)

    useEffect(() => {
        const callback = (data) => {
        //    console.log(data);
            setAnnouncements([...data]);
        };
        getKolAllAnnouncements(callback, token);
    }, []);

    useEffect(() => {
        const callback = (data) => {
         //   console.log(data);
            setAnnouncements([...data]);
        };
        getKolAllAnnouncements(callback, token);
    }, []);


    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
     // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(announcements.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(announcements.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, announcements]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % announcements.length;
     //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const handleDelete = (id) => {
        dispatch(announceDelete(id)).then((data) => {
            if (data.payload.statusCode === 200) {
                const callback = (data) => {
                    setCurrentItems([...data]);
                };
                getKolAllAnnouncements(callback, token);
            }
        });
    };

    return (
        <>
            <AnnouncementsItems currentItems={currentItems} handleDelete={handleDelete} />
            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;