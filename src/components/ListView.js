import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/Provider";
import CustomCard from "./CustomCard";
import app from "../firebase/base";
import CustomInputField from "./CustomInputField";

const ListView = ({data}) => {
    const {currentUser} = useContext(AuthContext);
    const [list, setList] = useState([])
    const onFormSubmitHandler = (data) => {
        let temp = [...list, data]
        setList(temp)
        app.firestore().collection(currentUser.uid).doc('tasks').set({task: temp})
    }

    const onDeleteHandler = (index) => {
        let temp = [...list]
        temp.splice(index, 1)
        setList(temp)
        app.firestore().collection(currentUser.uid).doc('tasks').set({task: temp})
    }
    useEffect(() => {
        const ref = app.firestore().collection(currentUser.uid).doc('tasks')
        ref.onSnapshot(docSnapshot => {
            if (docSnapshot.exists) {
                let data = docSnapshot.data()
                setList(data.task)
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }, [])

    return (
        <div>
            <CustomInputField onSubmit={onFormSubmitHandler} />
            {list.map((data, index) =>
                <CustomCard key={data} index={index + 1} body={data} onDeleteHandler={onDeleteHandler}/>
            )}
        </div>
    );
}

export default ListView;
