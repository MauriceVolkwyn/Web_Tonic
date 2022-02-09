import React, { useState } from 'react';
import { db } from '../Utils/firebase-utils'
import { collection, addDoc } from "firebase/firestore"; 
import '../spinner.css'

const Modal = ({visibility, title, text, color, bg}) => {
    const [closeMenu, setCloseMenu] = useState(true)
    const [fileDetails, setFileDetails] = useState(null);
    const [student,setStudent] = useState();
    const reader = new FileReader();
    const [loading,setLoading] = useState(false)

    const onToggleBtn = () => {
        setCloseMenu(!closeMenu);
    }

    //This function will get the csv file from input

    const uploadCSV = (e) => {
        const fileName = e['name'];
        const fileDate = new Date().toLocaleDateString();
        const fileTime = new Date().toLocaleTimeString();
        const data1 = {
            'name': fileName,
            'date': fileDate,
            'time': fileTime
        }   
        setFileDetails(data1)
        convertToString(e)
    }
    
    const convertToString = (e) => {
        reader.onload = function(e) {
            setStudent(reader.result)
        }
        reader.readAsText(e);

    }

    //When the user clicks the upload button
    
    const uploadToDatabase = (e) => {
        setLoading(!loading)
        convertToArray(e)
    }
    
    // The function below will split the string into array

    const convertToArray = (e) => {
        const Array = e.split("\r")
        getIdividualRow(Array)
    }

    //The function below we will split the array so we can get an individual row 

    const getIdividualRow = (e) => {
        for(let i = 1; i < e.length; i++ ){
            const user = e[i].split(',')
            getIndividualUser(user)
        }
    }

    const getIndividualUser = async(e) => {
        const student = {
            "student_number": e[0].substring(1),
            "name": e[1],
            "surname": e[2],
            "corse_code": e[3],
            "course_description": e[4],
            "grade": e[5],
            "date" : fileDetails
        }
        console.log(student)
        try {
            await addDoc(collection(db, "students"), student);
            setLoading(false)
            setCloseMenu(!closeMenu);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
    <div
     className={visibility === closeMenu ? "fixed z-10 inset-0 overflow-y-auto" : 'hidden'} 
     aria-labelledby="modal-title" 
     role="dialog" 
     aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div
             className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
             aria-hidden="true"></div>

                <span
                 className="hidden sm:inline-block sm:align-middle sm:h-screen" 
                 aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className={bg + " mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"}>
                        <svg
                         className={color + ' h-6 w-6'} 
                         xmlns="http://www.w3.org/2000/svg" 
                         fill="none" viewBox="0 0 24 24" 
                         stroke="currentColor" 
                         aria-hidden="true">
                        <path
                         strokeLinecap="round" 
                         strokeLinejoin="round" 
                         strokeWidth="2" 
                         d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                         className="text-lg leading-6 font-medium text-gray-900" 
                         id="modal-title">
                             {title}
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            {text}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='w-full py-4 px-5 text-sm'>
                    <input
                     type="file" 
                     accept=".csv,.xlsx,.xls"
                     onChange={(e) => uploadCSV(e.target.files[0])} 
                     />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                     type="button" 
                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                     onClick={onToggleBtn}>
                         Cancel
                    </button>
                    <button
                     type="button" 
                     className="w-24 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 sm:ml-3 sm:text-sm" onClick={(e) => uploadToDatabase(student)}>
                         {loading ? <div className='loader'></div> : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Modal;
