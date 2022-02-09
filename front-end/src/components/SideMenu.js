import React, { useEffect, useState } from 'react';
import { db } from '../Utils/firebase-utils'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../spinner.css'

const SideMenu = ({action, id}) => {
    const [menuOpen,setMenuOpen] = useState(true);
    const [studentNumber, setStudentNumber] = useState('')
    const [studentFirstname, setStudentFirstname] = useState('')
    const [studentSurname, setStudentSurname] = useState('')
    const [studentCourseCode,setStudentCourseCode] = useState('')
    const [studentCourseDescription,setStudentCourseDescription] = useState('')
    const [studentGrade,setStudentGrade] = useState('')
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState('')

    const closeMenu = () => {
        clearAll()
        setMenuOpen(!menuOpen)
    }

    const clearAll = () => {
        setStudentNumber('')
        setStudentFirstname('')
        setStudentSurname('')
        setStudentCourseCode('')
        setStudentCourseDescription('')
        setStudentGrade('')
    }

    useEffect(() => {
        if(!id == ''){
            const getStudent = async(e) => {
                const docRef = doc(db, "students", e);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setStudentNumber(docSnap.data().student_number);
                    setStudentFirstname(docSnap.data().name)
                    setStudentSurname(docSnap.data().surname)
                    setStudentCourseCode(docSnap.data().corse_code)
                    setStudentCourseDescription(docSnap.data().course_description)
                    setStudentGrade(docSnap.data().grade)
                } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                }
            }
            getStudent(id)
        }
    },[id])

    const changeStudentNumber = (e) => {
        setStudentNumber(e)
    }

    const changeStudentName = (e) => {
        setStudentFirstname(e)
    }

    const changeStudentSurname = (e) => {
        setStudentSurname(e)
    }

    const changeStudentCourseCode = (e) => {
        setStudentCourseCode(e)
    }

    const changeStudentCourseDescription = (e) => {
        setStudentCourseDescription(e)
    }

    const changeStudentGrade = (e) => {
        setStudentGrade(e)
    }

    const submitUpdate = async() => {
        setLoading(!loading)
        const taskDocRef = doc(db, 'students', id)
            try{
                await updateDoc(taskDocRef, {
                        name:studentFirstname,
                        surname:studentSurname,
                        corse_code:studentCourseCode,
                        studentCourseCode:studentCourseDescription,
                        grade:studentGrade
                    })
                    setMessage(`Student with ${studentNumber} number has been updated!`)
                    setLoading(false)
                    setTimeout(() => {
                        setMessage('')
                        setMenuOpen(!menuOpen)
                    }, 3000);
                } catch (err) {
                    alert(err)
                }
    }

  return (
    <>
        <div className={action === menuOpen ? "fixed inset-0 overflow-hidden" : 'hidden'} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
                
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                
                    <div className={action === menuOpen ? "relative w-96" : "w-0"} style={{'transition': 'width 2s'}}>
                        
                        <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                        <button type="button" className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={closeMenu}>
                            <span className="sr-only">Close panel</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>

                        <div className="h-full flex flex-col bg-white shadow-xl overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 bg-gray-800">
                            <h2 className="text-lg mt-1 font-medium text-white" id="slide-over-title">Update Student</h2>
                        </div>
                        {message && <div className='w-11/12 m-auto bg-green-50 border border-green-500 rounded-sm p-2 text-sm mt-3 -mb-4'>
                            <p className='text-sm text-green-600'>{message}</p>
                        </div>}
                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                            <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="" aria-hidden="true">
                                <label className="ml-1">Student Number</label>
                                <input type="number" value={studentNumber} disabled placeholder="Student number" name="student_number" className='w-full px-2 py-1 border border-gray-300 rounded-sm my-1' onChange={(e) => changeStudentNumber(e.target.value)}/>
                                <label className="ml-1">Firstname</label>
                                <input type="text" name="firstname" value={studentFirstname} placeholder="Firstname" className='w-full px-2 py-1 border border-gray-300 rounded-sm my-1' onChange={(e) => changeStudentName(e.target.value)}/>
                                <label className="ml-1">Surname</label>
                                <input type="text" name="surname" value={studentSurname} placeholder="Surname" className='w-full px-2 py-1 border border-gray-300 rounded-sm my-1' onChange={(e) => changeStudentSurname(e.target.value)}/>
                                <label className="ml-1">Course Code</label>
                                <input type="text" name="course_code" value={studentCourseCode} placeholder="Course Code" className='w-full px-2 py-1 border border-gray-300 rounded-sm my-1' onChange={(e) => changeStudentCourseCode(e.target.value)}/>
                                <label className="ml-1">Course Description</label>
                                <input type="text" name="course_description" value={studentCourseDescription} placeholder="Course Description" className='w-full px-2 py-1 border border-gray-300 rounded-sm my-1' onChange={(e) => changeStudentCourseDescription(e.target.value)}/>
                                <label className="ml-1">Grade</label>
                                <input type="text" name="grade" value={studentGrade} placeholder="Grade" className='w-full px-2 py-1 border border-gray-300 rounded-sm my-1' onChange={(e) => changeStudentGrade(e.target.value)}/>
                            </div>
                            </div>
                        </div>
                            <div className='absolute w-full bottom-0 p-3'>
                                <button className='w-full py-1 rounded-sm text-white bg-blue-600 hover:bg-blue-700' onClick={submitUpdate}>
                                    {loading ? <div className='loader m-auto'></div> : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default SideMenu;
