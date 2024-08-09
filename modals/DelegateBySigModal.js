const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const delegateBySignSchema = new Schema({
    delegatee: {
        type: String,
        required: true,
        unique: true,
    },
    sign:
    {
        nonce: { type: Number, required: true },
        expiry: { type: Number, required: true },
        v: { type: Number, required: true },
        r: { type: String, required: true },
        s: { type: String, required: true },
    }
});

const castVoteBySigSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    sign:
    [{ 
        proposalId: { type: Number, required: true },
        voteFor: { type: Boolean, required: true },
        v: { type: Number, required: true },
        r: { type: String, required: true },
        s: { type: String, required: true },
    }]
});
const castVoteJudgementSchema = new Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    sign:
    [{
        judgementId: { type: Number, required: true },
        favourJudgment: { type: Boolean, required: true },
        v: { type: Number, required: true },
        r: { type: String, required: true },
        s: { type: String, required: true },
    }]
});
const DelegateSignature = mongoose.model("DelegateSignature", delegateBySignSchema);
const CastVoteSignature = mongoose.model("CastVoteSignature", castVoteBySigSchema);
const CastVoteJudgement = mongoose.model("CastVoteJudgement", castVoteJudgementSchema);

module.exports = {
    DelegateSignature,
    CastVoteSignature,
    CastVoteJudgement
};