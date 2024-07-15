import { useDispatch, useSelector } from 'react-redux';
import Table from 'components/Table';
import { columns as baseColumns } from './columns';
import { createRef, useState } from 'react';
import { deleteBulkItem, deleteMemberAsync, deleteMembersAsync, deleteTeamItem, updateMemberAsync, updateTeam } from '../teamSlice';
import Modal from 'components/Modal';
import { FiCheckCircle } from 'react-icons/fi';
import TextContainer from '../components/TextContainer';

export const modalRef = createRef();

const TeamListing = () => {
    const { teams, pagination } = useSelector(state => state.teamState);
    const dispatch = useDispatch()

    const [showDeleteSuccess, setShowDeleteSucess] = useState(false);
    const [selectedRowsIds, setSelectedRowsIds] = useState({});


    const handleSubmit = (formData) => {
        dispatch(updateMemberAsync(formData));
        modalRef.current?.close();
    };

    const handleDeleteSubmit = ({ _id }) => {
        try {
            dispatch(deleteMemberAsync(_id));
            modalRef.current?.close();
            setShowDeleteSucess(true)
            setTimeout(() => {
                setShowDeleteSucess(false)
            }, 500);
        } catch (error) {
            console.error(error)
        }
    };

    const handleCheckboxChange = (id) => {
        console.log({ id })
        setSelectedRowsIds((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleAllCheckboxCheck = () => {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        const selectedIds = {};
        checkboxes.forEach((checkbox) => {
            const id = checkbox.getAttribute('id');
            selectedIds[id] = !checkbox.checked;
            checkbox.checked = !checkbox.checked;
        });
        setSelectedRowsIds(selectedIds)
    };

    const handleDeleteSelected = () => {
        try {
            const Ids = Object.entries(selectedRowsIds).map(([key, value]) => value ? key : false).filter(Boolean);
            dispatch(deleteMembersAsync(Ids));
        } catch (error) {
            console.error(error)
        }
    }

    const columns = baseColumns({ handleSubmit, handleAllCheckboxCheck, handleDeleteSubmit, handleCheckboxChange, selectedRowsIds });

    return (
        <section className='space-y-4 select-none'>
            <Modal trigger={showDeleteSuccess} className="h-fit p-4 w-80">
                <div className='bg-green-400/10 w-16 h-16 rounded-full flex items-center justify-center '>
                    <FiCheckCircle className='text-green-400 bg-green-400/10 w-12 h-12  rounded-full p-2' size={25} />
                </div>
                <TextContainer title={'Users Successfully Deleted!'} />
            </Modal>
            <section className='flex items-center justify-between'>
                <h5 className='text-lg flex items-center gap-2'>Team members
                    <span class="inline-flex whitespace-nowrap max-w-min items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">{teams.length} members</span>
                </h5>
                <button onClick={handleDeleteSelected} className='btn btn--primary'>delete selected</button>
            </section>
            <Table columns={columns} data={teams} pagination={pagination} />
        </section>
    )
}

export default TeamListing