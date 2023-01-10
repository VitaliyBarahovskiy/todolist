import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle : (title: string) => void
}


const EditableSpan: FC<EditableSpanPropsType> = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input value={title}
            autoFocus={true}
            onBlur={offEditMode}
            onChange={onChangeSetLocalTitleHandler}
            />
            : <span
                onDoubleClick={onEditMode}
                className={props.classes}
            >
                {props.title}
        </span>
    )
}

export default EditableSpan;