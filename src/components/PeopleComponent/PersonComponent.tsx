import React from 'react'

const PersonComponent = (props: any) => {
    return (
        <div className="col-md-4 my-2 person px-2">
            <div className="person_wrapper">
                <h4 className="person_name p-1">{props.name}</h4>
                <div className="person_details">
                    <p>birth_year : {props.birth_year}</p>
                    <p>gender : {props.gender}</p>
                    <p>height : {props.height}</p>
                    <p>mass : {props.mass}</p>
                </div>
            </div>
        </div>
    )
};

export default PersonComponent