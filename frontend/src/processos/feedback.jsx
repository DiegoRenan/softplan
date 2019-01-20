import React from 'react'

export default props => {

    const renderFeedbacks = () => {
        const feedbacks = props.feedbacks || []
        const index = 0
        console.log(feedbacks)

        return feedbacks.map( feedback => 
            <div className="alert alert-warning" role="alert">
                {feedback.text} 
                <p>by: {feedback.author.name}</p>
            </div>
        )
    }

    return(
        <div>
            {renderFeedbacks()}
        </div>
    )
     
}