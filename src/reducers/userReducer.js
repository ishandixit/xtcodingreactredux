const intialState = {
  user: [
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    },
    {
      comment: "36",
      voteCount: 0,
      upVote: "",
      newDetails: "hello to row 1"
    }
  ]
};
const AddUpvote = (state, action) => {
  switch (action.type) {
    case "ADD_UPVOTE": {
      state[action.payload]["voteCount"] =
        state[action.payload]["voteCount"] + 1;
      return state;
    }
  }
  return intialState.user;
};
export default AddUpvote;
