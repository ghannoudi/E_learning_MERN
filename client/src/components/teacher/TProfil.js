import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CurrentUser } from '../../api/UserApi'
import Footer from '../footer/Footer'
import Header from './Header'

import "./style.css"

function TProfil() {
    const [user, setUser] = useState({})

    const isUser = async () => {
        const lg = await CurrentUser()
        setUser(lg)

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        const { data } = await axios.post(
            "/api/upload",
            bodyFormData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        setUser({ ...user, photo: data });

    };

    useEffect(() => {
        isUser()


    }, [])
    const handleUpdate = () => {
        axios.put(`/user/editUser/${user._id}`, user)
        window.location.reload()
    }

    return (
        <div>
            <div>
                <Header/>
            </div>
        <div className='profil'>
            <div className='head'>
                <h1>my profil</h1>
            </div>

            <div className='body'>
                <div className='body1'>
                    <form>
                        <input className='inpute1' disabled={true} type="text" value={user.email} />
                        <input className='inpute1' disabled={true} type="text" value={user.cin} />
                        <input className='inpute' type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        <input className='inpute' type="text" value={user.tel} onChange={(e) => setUser({ ...user, tel: e.target.value })} />

                    </form>
                </div>
                <div className='body2'>
                    <input className='inptimg fileee' type="file" onChange={(e) => uploadFileHandler(e)} />
                    <img className={user.photo ? 'image' : null} src={user.photo && `http://localhost:8080${user.photo}`} />
                    {user.photo && <button className='btn btn-danger' onClick={() => setUser({ ...user, photo: "" })}>Remove</button>}

                </div>


            </div>
            <button className='btn btn-success btnp' onClick={handleUpdate}>Update</button>
            </div>
            <div>
                <Footer/>
            </div>
        </div>

    )
}
export default TProfil