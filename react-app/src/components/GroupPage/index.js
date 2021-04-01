import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getOne} from '../../store/groups'
import {addToGroup, removeFromGroup} from '../../store/session'
import { Link, useParams } from 'react-router-dom';
import "./GroupPage.css"
import EventCard from '../EventCard/index'
import AttendeeCard from '../EventPage/AttendeeCard/AttendeeCard'

const GroupPage = ()=> {
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group)
    const [inGroup, setInGroup] = useState(false)
    const { groupId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOne(groupId))

        if(sessionUser){
            if (sessionUser.groups.indexOf(parseInt(groupId)) !== -1) {
                setInGroup(true)

            }
            else {
                setInGroup(false)
            }
        }
    }, [dispatch, sessionUser, groupId])

    const joinGroup = ((e) => {
        e.preventDefault()
        dispatch(addToGroup(groupId))
    })

    const joinPrivateGroup = ((e) => {
        e.preventDefault()
        const button = document.getElementById("private-join")
        button.innerHTML = "Request Sent"
        button.setAttribute("disabled", true)
        dispatch(addToGroup(groupId))
    })

    const leaveGroup = ((e) => {
        e.preventDefault()
        dispatch(removeFromGroup(groupId))
    })

    return (
        <>
            <div className='group__container'>
                <div className='group__title'>
                    <div className='group__photo'>
                        <img src={group.image_url} alt='group'></img>
                    </div>
                    <div className='group__info'>
                        <h1>{group.name}</h1>
                        <h3>Located in {group.location}</h3>
                        {
                            group.is_private ?
                                inGroup ?
                                    <>
                                        <div className='private-status'>
                                            <h3>Private Group</h3>
                                        </div>
                                        <div className='leave__div'>
                                            <form>
                                                <button onClick={leaveGroup}> Leave {group.name} </button>
                                            </form>
                                        </div> 
                                    </>
                                        :
                                    <>
                                        <div className='private-status'>
                                            <h3>Private Group</h3>
                                        </div>
                                         <div className='join__div'>
                                            <form>
                                                <button id='private-join' onClick={joinPrivateGroup}> Join {group.name} </button>
                                            </form>
                                        </div>
                                    </>
                                :
                               inGroup ? 
                                    <div className='leave__div'>
                                        <form>
                                            <button onClick={leaveGroup}> Leave {group.name} </button>
                                        </form>
                                    </div> :
                                    <div className='join__div'>
                                        <form>
                                            <button onClick={joinGroup}> Join {group.name} </button>
                                        </form>
                                    </div>
                        }
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
                
                <div className='group__members_container'>
                    <div>
                        <h3>Members</h3>
                    </div>
                    
                    <div className='members'>
                        {
                            group?.members?.map(member => {
                                return (
                                    <Link key={member.id} to={`/users/${member.id}`}>
                                        <AttendeeCard user={member}/>
                                    </Link>
                                )
                            })
                        }
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
