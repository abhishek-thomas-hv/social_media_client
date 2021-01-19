import React from 'react'
import moment from 'moment'

function Comments({ handleSubmit, setDetails, details, comments }) {
    return (
        <>

            <div className="row" style={{ 'padding': "20px", 'border-top': '1px solid rgba(160,160,160,0.2)' }}>
                <form className="col s12" onSubmit={(e) => handleSubmit(e)}>

                    <div className='row'>
                        <div class="input-field col s10 l9 offset-l1 grey-text text-darken-1">
                            <i class="material-icons prefix">comment</i>
                            <textarea id="textarea-comments" class="materialize-textarea valdiate" required={true}
                                onChange={(e) => setDetails({ ...details, text: e.target.value })} value={details.text}></textarea>
                            <label for="textarea-comments">Write your comment</label>
                        </div>

                        <div className='col l2'>
                            <button class="btn-floating btn-flat transparent left" type="submit" style={{ 'margin-top': "18px" }} name="action">
                                <i class="material-icons grey-text text-darken-1">send</i>
                            </button>
                        </div>

                    </div>

                </form>

            </div>


            {comments.length > 0 ?

                (<div className='row comments-row'>
                    <div className='col l10 offset-l1 s10 offset-s1'>

                        {comments.map(

                            comment =>

                                (

                                    <div class="card row  grey lighten-5 z-depth-1" style={{ "padding": "10px 0px 0 20px" }}>
                                        <div class="col s2">
                                            <img src={comment.userProfilePicture} alt="" style={{ "border-radius": "50%" }} class="img-responsive-thumbnail" />
                                            <div class="black-text text-responsive-thumbnail">

                                            </div>


                                        </div>
                                        <div class="col s9">
                                            <div class="black-text left">
                                                <span className="" style={{ "font-size": "13px" }}>{comment.user}</span>
                                                <p style={{ "font-size": "11px", 'margin': '0px' }} className='grey-text'> &nbsp;{moment(comment.date).fromNow()}</p>
                                                <p style={{ "font-size": "13px" }} class='black-text'>{comment.comment}</p>

                                            </div>
                                        </div>
                                    </div>


                                )


                        )}
                    </div>

                </div>) : <p className='center'>No Comments Yet</p>
            }

        </>
    )
}

export default Comments
