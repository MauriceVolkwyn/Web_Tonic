import React, { useState } from 'react';
import Button from './Button';
import TableComponent from './TableComponent';
import Modal from './Modal';

function PageBlock() {
    const [openMenu, setOpenMenu] = useState(false);

    const onToggleBtn = () => {
        setOpenMenu(!openMenu);
    }

  return (
      <>
        <div className='w-11/12 py-3 justify-end m-auto'>
            <Button title="Upload" action={onToggleBtn}/>
        </div>
        <div className='flex w-full'>
            <div className='w-11/12 bg-gray-200 shadow-md py-1 px-1 m-auto rounded'>
                <TableComponent />
            </div>
        </div>
        <Modal
         visibility={openMenu} 
         title="Upload CSV"
         text="Please select the file you would like to upload."
         color="text-blue-600"
         bg="bg-blue-50"/>
      </>
  );
}

export default PageBlock;
