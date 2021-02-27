import React, { useState } from 'react'
import { Modal } from '../../context/modal'
import CreateGroupForm from './CreateGroupForm'

function GroupFormModal({ setAuthenticated, authenticated }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='navbar__button' onClick={() => setShowModal(true)}>
                Create Group
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateGroupForm setAuthenticated={setAuthenticated} authenticated={authenticated} />
                </Modal>
            )}
        </>
    )
}

export default GroupFormModal
