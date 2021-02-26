import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getOne, addMember} from '../../store/groups'
import { NavLink, useParams } from 'react-router-dom';
import "./GroupPage.css"
import EventCard from '../EventCard/index'

const GroupPage = ()=> {
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group)

    const { groupId } = useParams()
    
    const dispatch = useDispatch()

    console.log('session user', sessionUser)
    console.log('group:', group)

    useEffect(() => {
        dispatch(getOne(groupId))

    }, [dispatch, groupId])


    return (
        sessionUser && 
        <>
            <div className='group__container'>
                <div className='group__title'>
                    <div className='group__photo'>
                        <img src={group.image_url}></img>
                    </div>
                    <div className='group__info'>
                        <h1>{group.name}</h1>
                        <h3>Created by {group.owner_name}</h3>
                        <h3>Located in {group.location}</h3>
                        <div className='join__div'>
                            <form action={`/api/groups/${groupId}`} method='POST'>
                                <button onClick={dispatch(addMember(groupId, sessionUser))}> Join {group.name} </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='group__description'>
                    <div>
                        <h2>Description</h2>
                    </div>
                    
                    <div className='description'>
                        <p> {group.description}</p>
                    </div>
                </div>

                <div className='group__events'>
                    <div>
                        <h2>Events</h2>
                    </div>

                    <EventCard group={group} />
                </div>

            </div>
        </>
    )
    
   
}

export default GroupPage;