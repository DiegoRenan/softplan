import React from 'react'

export default props => {

    const renderFeedbacks = () => {
        const feedbacks = props.feedbacks || []
        
        if(feedbacks != []){
            return feedbacks.map( fb => 
                        <div className="alert alert-warning" role="alert">
                            {fb.text}  
                            <p>{fb.author.username}</p>
                        </div>
                    )
        }
    }

    return(
        <div>
            {renderFeedbacks()}
        </div>
    )
     
}