import React, { useState } from 'react'
import { Modal } from '../../../context/modal'
import SignUpForm from './SignUpForm'

function SignUpFormModal({setAuthenticated, authenticated}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='navbar__button' onClick={() => setShowModal(true)}>
                Sign Up
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
                </Modal>
            )}
        </>
    )
}

export default SignUpFormModal
