import React from 'react';

const IsLoadingComponent = (props: any) => {
    return (
        <React.Fragment>
            {props.isLoading && (
                <div className='loading'>
                    <p className='loading_text'>Is Loading ...</p>
                </div>
            )}
        </React.Fragment>
    )
}

export default IsLoadingComponent;