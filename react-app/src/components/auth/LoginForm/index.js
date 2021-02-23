import React, { useState } from 'react'
import { Modal } from '../../../context/modal'
import LoginForm from './LoginForm'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='navbar__button' onClick={() => setShowModal(true)}>
                Log in
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal