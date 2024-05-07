/*

each image has an onClick event listener
An up arrow image
A down arrow image

information we need from the backend:
Total number of up votes
Total number of down votes

information we send in the post request:
voteValue (up or down)
userId


total upVotes
total downVotes

query the votes table for the user's vote direction, using that in the onClick event listener to decide what happens when they click.

query votes table; look to see if anything is returned when we ask is there a vote that has the userId reviewId already?

State:

[upVotes, setUpVotes]
[downVotes, setDownVotes]

[voteValue, setVoteValue] (of the current user)



IMPLEMENTATION:

//Setting vote value based on clicks:

fetchedVoteValue = vote value fetched from backend

upArrow onClick => {

  if fetchedVoteValue === 0 {            //if the user hasn't voted
    setVoteValue(1)
    setUpVotes(upVotes + 1)               //set the vote value to one
  }else{
    setVoteValue(0)
    setUpVotes(upVotes - 1)              //if they have already voted, set the vote value to 0
  }
}               

downArrow onClick => {
  if fetchedVoteValue === 0{           //if the user hasn't voted
    setVoteValue(-1)  
    setDowVotes(downVotes + 1)          //set the vote value to negative one
  } else {
    setVoteValue(0)                    //if they have already voted, set the vote value to 0
    setDownVotes(downVotes - 1)
  }
}

// voteRecord = await Votes.query().where("reviewId" = body.reviewId).where("userId" = body.userId)

// if(!voteRecord) if the vote doesn't exist
//	{
//  newVote = Votes.query().insert({Voteinformation})
//  }

//else {
//perform logic determining what to do
//}