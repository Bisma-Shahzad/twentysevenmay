import React, { useEffect, useState } from 'react'
import { Get } from '../../config/Axios/apibasemethods';
import grid from '../../component/grid';

function Studentget() {

    const [model, setModel] = useState([]);

    let getdata = () => {
        Get('/students').then((res) => {
            console.log(res.data.data);
            setModel([...res.data.data]);
        })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        getdata();
    }, []);

    let cols = [
        {
            displayName: "First Name",
            key: "firstName",
        },
        {
            displayName: "Last Name",
            key: "lastName",
        },
        {
            displayName: "Email",
            key: "email",
        },
        {
            displayName: "Password",
            key: "password",
        },
        {
            displayName: "Contact",
            key: "contact",
        },
    ]


    return (
        <div>

            <grid title="Students List" datasource={model} columns={cols} />
        </div>
    )
}

export default Studentget;