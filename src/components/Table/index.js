import { fetchteams } from 'features/Team/teamSlice';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TableHeader = ({ columns }) => (
    <thead>

        <tr className="select-none text-left text-gray-500 bg-gray-100 capitalize border-gray-600">
            {columns.map((column) => (
                <th key={column.title} class="px-6 py-4 font-normal">
                    {column.title}
                </th>
            ))}
        </tr>
    </thead>
);

const TableRow = ({ row, columns, handleRowClick }) => (
    <tr
        key={row.id}
        className="hover:bg-gray-50 cursor-pointer"
    >
        {columns.map((column) => {
            const value = column.accessor ? row[column.accessor] : row;
            return (
                <TableColumn key={uuidv4()} value={value} render={column.render} />
            );
        })}
    </tr>
);

const TableColumn = ({ value, render }) => (
    <td className="px-4 py-3 border-b">{render ? render(value) : value}</td>
);


const DataTable = ({ columns, data, pagination, itemsPerPage = 10 }) => {
    const dispatch = useDispatch();
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(Math.floor(itemOffset / itemsPerPage));

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data?.slice?.(itemOffset, endOffset);
    const pageCount = Math.ceil(pagination / itemsPerPage);

    const changeOffset = (selected) => {
        const newOffset = (selected * itemsPerPage) % pagination;
        setItemOffset(newOffset);
        setCurrentPage(selected)
    }

    const handlePageClick = (event) => {
        changeOffset(event.selected)
        dispatch(fetchteams(event.selected))
    };

    const handlePreviousClick = () => {
        const previousPage = Math.floor(itemOffset / itemsPerPage) - 1;
        changeOffset(previousPage)
    };

    const handleNextClick = () => {
        const nextPage = Math.floor(itemOffset / itemsPerPage) + 1;
        changeOffset(nextPage)
    };

    return (
        <section className="mx-auto">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <TableHeader columns={columns} />
                        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                            {currentItems?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    columns={columns}
                                />
                            ))}
                        </tbody>
                    </table>

                    {pagination && <div class="flex items-center justify-between p-4">
                        <button onClick={handlePreviousClick}
                            disabled={currentPage === 0} className='btn btn--outline'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>

                            <span>
                                previous
                            </span>
                        </button>

                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=""
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel=""
                            className='flex items-center gap-4'
                            renderOnZeroPageCount={null}
                            forcePage={currentPage}
                            pageClassName="px-2 select-none py-1 text-sm rounded-md text-gray-400"
                            activeClassName='px-3 py-1 text-sm text-blue-800 rounded-md bg-purple-100 text-purple-800'
                        />

                        <button className='btn btn--outline'
                            onClick={handleNextClick}
                            disabled={currentPage >= pageCount - 1}
                        >
                            <span>
                                Next
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default DataTable;