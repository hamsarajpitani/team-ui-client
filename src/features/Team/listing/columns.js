import dayjs from 'dayjs';
import { formatToIndianCurrency, formatToIndianCurrencyWithLabel } from 'utils/helpers/currencyFormatter';
import TextContainer from '../components/TextContainer';
import Modal from 'components/Modal';
import DynamicForm from 'components/Form';
import { formConfig } from './config';
import { modalRef } from '.';
import { ReactComponent as BinIcon } from '../assets/BinIcon.svg';
import { ReactComponent as EditIcon } from '../assets/EditIcon.svg';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import CheckBox from 'components/Checkbox';

dayjs.extend(require('dayjs/plugin/advancedFormat'));

export const columns = ({ handleSubmit, handleAllCheckboxCheck, handleDeleteSubmit, handleCheckboxChange, selectedRowsIds }) => [
    {
        title: <div className='flex items-center -ml-2'>
            <CheckBox onChange={() => handleAllCheckboxCheck()} />
            name</div>,
        render: (row) => {
            const { avatar, name, email, id } = row;
            const emailDomain = email.split('@').at(-1);

            return <div class='flex items-center'>
                <CheckBox id={id} className="row-checkbox" checked={!!selectedRowsIds[id]} onChange={() => handleCheckboxChange(id)}
                />
                <img
                    class='object-cover w-8 h-8 mr-2 rounded-full'
                    src={avatar}
                    alt={name}
                    loading='lazy'
                />
                <TextContainer title={name} desc={`@${emailDomain}`} />
            </div>
        },
    },
    {
        title: 'state',
        accessor: 'isActive',
        render: ({ isActive }) =>
            <span
                class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
            >
                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                {isActive} Active
            </span>
    },
    {
        title: 'role',
        accessor: 'role',
        render: (role) => {
            return <TextContainer title={role} />
        }
    },
    {
        title: 'email',
        accessor: 'email',
        render: (email) => {
            return <TextContainer title={email} />
        }
    },
    {
        title: 'team',
        accessor: 'teams',
        render: (teams) =>
            <div class="flex flex-wrap w-fit gap-x-2 gap-y-4">
                {teams?.slice(0, 3)?.map(name => <span
                    class="inline-flex max-w-min items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                >
                    {name}
                </span>
                )}
                {teams.length - 3 > 0 && <span
                    class="inline-flex max-w-min items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600"
                >
                    +{teams.length - 3}
                </span>
                }
            </div>
    },
    {
        render: (data) => {
            return <>
                <div class="flex justify-end gap-4">
                    <Modal
                        title={`Are you sure you want to delete selected users?`}
                        ref={modalRef}
                        trigger={
                            <MdDeleteForever size={25} />
                        }
                        className="w-fit p-6"
                    >
                        <div className="grid grid-cols-2 gap-6 text-center">
                            <button type="button" className="btn--outline" onClick={() => modalRef.current.close()}>Cancel</button>
                            <button onClick={() => handleDeleteSubmit(data)} type="submit" className="btn--primary">confirm</button>
                        </div>
                    </Modal>

                    <Modal
                        title={`Edit User Details`}
                        ref={modalRef}
                        trigger={
                            <MdEdit size={20} />
                        }
                    >
                        <DynamicForm onCancel={() => modalRef?.current?.close()} initialValues={data} formConfig={formConfig} onSubmit={handleSubmit} />
                    </Modal>

                </div>
            </>
        }
    },
]