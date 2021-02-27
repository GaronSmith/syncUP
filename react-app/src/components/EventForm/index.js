import React, { useState } from 'react'
import { Modal } from '../../context/modal'
import EventForm from './EventForm'

function EventFormModal({setAuthenticated, authenticated}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='navbar__button' onClick={() => setShowModal(true)}>
                Create Event
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm setAuthenticated={setAuthenticated} authenticated={authenticated}/>
                </Modal>
            )}
        </>
    )
}

export default EventFormModal
