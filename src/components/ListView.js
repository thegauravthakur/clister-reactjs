import React, {useContext, useEffect, useState} from 'react'
import {List} from "react-movable";
import app from "../firebase/base";
import CustomInputField from "./CustomInputField";
import CustomCard from "./CustomCard";
import {LastRouteVisitedContext} from "../context/LastRouteVisited";
import {AuthContext} from "../context/Provider";
import SnackBarBottom from "./SnackBarBottom";
import EmptyImageComponent from "./EmptyImageComponent";

const ListView = ({listName}) => {
    const {currentUser} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [snackBarData, setSnackBarData] = useState({open: false, type: '', message: '',});

    const currentEditList = useContext(LastRouteVisitedContext);
    const onFormSubmitHandler = (data) => {
        if (data === '') {
            setSnackBarData({
                open: true,
                message: 'Input should not be empty',
                type: 'warning'
            })
        } else {
            let temp = [...list, data]
            setList(temp)
            app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: temp}).then(() => {
                setSnackBarData({type: 'success', message: 'item added!', open: true})
            })
            currentEditList.toggle(listName);
        }

    }

    const onDeleteHandler = (index) => {
        let temp = [...list]
        temp.splice(index, 1)
        setList(temp)
        app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: temp}).then(() => {
            setSnackBarData({
                open: true,
                message: 'successfully deleted!',
                type: 'success'
            })
        })
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
            <SnackBarBottom open={snackBarData.open} handleClose={() => setSnackBarData({open: false})}
                            type={snackBarData.type}
                            message={snackBarData.message}/>
            <CustomInputField onSubmit={onFormSubmitHandler}/>
            {list.length !== 0 ?
                <List
                    values={list}
                    onChange={({oldIndex, newIndex}) => {
                        let lines = [...list];
                        let task = lines[oldIndex];
                        lines.splice(oldIndex, 1);
                        lines.splice(newIndex, 0, task);
                        setList(lines);
                        app.firestore().collection(currentUser.uid).doc(`${listName}`).set({task: lines}).then()

                    }}
                    renderList={({children, props}) => <div {...props}>{children}</div>}
                    renderItem={({index, value, props}) => <CustomCard pprops={props} index={index} body={value}
                                                                       onDeleteHandler={(index) => onDeleteHandler(index)}/>}
                /> :
                <EmptyImageComponent/>}
        </div>
    );
}

export default ListView;
