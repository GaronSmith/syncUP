import React, { useState } from 'react'
import { Modal } from '../../../context/modal'
import LoginForm from './LoginForm'

function LoginFormModal({setAuthenticated, authenticated}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='navbar__button' onClick={() => setShowModal(true)}>
                Log in
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal