import React,{ useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { db } from '../Utils/firebase-utils';
import { collection, query, deleteDoc, onSnapshot, doc } from "firebase/firestore"; 
import DefaultLoadingComponent from './DefaultLoadingComponent';
import SideMenu from './SideMenu';

function TableComponent() {    
    const [studentFier , setStudentFier ] = useState('')
    const [loading,setLoading] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [studentID, setStudentID] = useState(null);

    const columns = [
        {
            name: 'Student Number',
            selector: row => row.student_number,
        },
        {
            name: 'Firstname',
            selector: row => row.name,
        },
        {
            name: 'Surname',
            selector: row => row.surname,
        },
        {
            name: 'Course Code',
            selector: row => row.corse_code,
        },
        {
            name: 'Course Description',
            selector: row => row.course_description,
        },
        {
            name: 'Grade',
            selector: row => row.grade,
        },
        {
            name: 'Action',
            selector: row => 
            <div className='w-40 flex flex-wrap justify-between py-1'>
                <button className='w-24 m-1 bg-yellow-500 hover:bg-yellow-600 px-5 py-1 rounded text-white' onClick={(e) => editStudent(row.doc_id)}>Edit</button>
                <button className='w-24 m-1 bg-red-500 hover:bg-red-600 px-5 py-1 rounded text-white' onClick={(e) => deleteStudent(row.doc_id)}>Delete</button>
            </div>
        }
    ];
    
    const editStudent = (e) => {
        setStudentID(e)
        setOpenSideMenu(!openSideMenu)
    }
    
    const deleteStudent = async(e) => {
        await deleteDoc(doc(db, "students", e));
    }

    useEffect(() => {
        const getStudents = async() => {
            const q = query(collection(db, "students"));
            onSnapshot(q, (querySnapshot) => {
            const ListStudents = [];
            querySnapshot.forEach((doc) => {
                const docId = {'doc_id':doc.id}
                const newObj = Object.assign(doc.data(), docId)
                ListStudents.push(newObj);
            });
            setStudentFier(ListStudents)
            setLoading(!loading);
            });
        }
        getStudents()

    }, [])

  return (
  <>
      {!loading ?
        <DefaultLoadingComponent />
        :
        <>
            <DataTable
                columns={columns}
                data={studentFier}
                pagination={true}
                paginationPerPage={5}
            />
            {studentID == null ? '' : <SideMenu 
            action={openSideMenu}
            id={studentID}
            />}
        </>

       }
  </>
  );
}

export default TableComponent;
