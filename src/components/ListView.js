import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/Provider";
import CustomCard from "./CustomCard";
import app from "../firebase/base";
import CustomInputField from "./CustomInputField";
import {LastRouteVisitedContext} from "../context/LastRouteVisited";

const ListView = ({listName}) => {
    const {currentUser} = useContext(AuthContext);
    const [list, setList] = useState([])
    const currentEditList = useContext(LastRouteVisitedContext);
    const onFormSubmitHandler = (data) => {
        let temp = [...list, data]
        setList(temp)
        app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: temp})
        currentEditList.toggle(listName);
    }

    const onDeleteHandler = (index) => {
        let temp = [...list]
        temp.splice(index, 1)
        setList(temp)
        app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: temp})
    }
    useEffect(() => {
        const ref = app.firestore().collection(currentUser.uid).doc(`${listName}`)
        ref.onSnapshot(docSnapshot => {
            if (docSnapshot.exists) {
                let data = docSnapshot.data()
                setList(data.task)
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }, [listName])

    return (
        <div>
            <CustomInputField onSubmit={onFormSubmitHandler}/>
            {list.map((data, index) =>
                <CustomCard key={data} index={index + 1} body={data} onDeleteHandler={onDeleteHandler}/>
            )}
        </div>
    );
}

export default ListView;
