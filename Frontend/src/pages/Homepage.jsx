import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {

    const navigate = useNavigate()

    const { logout } = useAuthStore()

    const handleClick = () => {
        logout()
        navigate('/auth')
    }

    return (
        <>
            <div className='flex gap-5'>
                Homepage
                <button onClick={handleClick} >logout</button>
            </div>
        </>
    )
}

export default Homepage