import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReviewPane from "../ReviewPane/ReviewPane";
import classes from "./Pagination.module.css";

function Pagination({ data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <div className={classes.wrapper}>
            <div>
                {currentItems.map((review) => {
                    return (
                        <ReviewPane
                            email={review.email}
                            message={review.comment}
                        />
                    );
                })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={classes.pagination}
                pageLinkClassName={classes.pageNum}
                previousLinkClassName={classes.pageNum}
                nextLinkClassName={classes.pageNum}
                activeLinkClassName={classes.active}
            />
        </div>
    );
}

export default Pagination;
