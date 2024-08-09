const { DelegateSignature, CastVoteSignature, CastVoteJudgement } = require("../modals/DelegateBySigModal");
const DelegateBySig = async (req, res) => {
  try {
    const { delegatee, nonce, expiry, v, r, s } = req.body;
    const existingDelegatee = await DelegateSignature.findOne({ delegatee });

    if (existingDelegatee) {
      existingDelegatee.sign = ({
        nonce: nonce,
        expiry: expiry,
        v: v,
        r: r,
        s: s,
      });
      const updateDelegatee = await existingDelegatee.save();
      console.log("API resut for update", updateDelegatee);
      return {
        code: 200,
        message: 'Success - Saved sign data to existing record',
        data: updateDelegatee,
      };
    } else {
      const obj = {
        delegatee,
        sign: {
          nonce: nonce,
          expiry: expiry,
          v: v,
          r: r,
          s: s,
        }
      };

      const result = await DelegateSignature.create(obj);

      console.log("API result for new", result);
      return {
        code: 200,
        message: 'Success - Saved referral data as a new record',
        data: result,
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return {
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      };
    } else if (error.name === "MongoError" && error.code === 11000) {
      return {
        code: 409,
        message: "Conflict - Duplicate wallet address",
        error: error.message,
      };
    } else {
      return {
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      };
    }
  }
};
const DeleteDelegateBySig = async (req, res) => {
  try {
    const { delegatee } = req.body;

    const deletedRecord = await DelegateSignature.findOneAndDelete({ delegatee });

    if (deletedRecord) {
      console.log("Deleted record:", deletedRecord);
      return {
        code: 200,
        message: 'Success - Deleted record',
        data: deletedRecord,
      };
    } else {
      return {
        code: 404,
        message: 'Not Found - Record not found for deletion',
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return {
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      };
    } else {
      return {
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      };
    }
  }
};
const CastVoteBySig = async (req, res) => {
  try {
    const { walletAddress, proposalId, voteFor, v, r, s } = req.body;
    console.log(req.body);
    const existingwalletAddress = await CastVoteSignature.findOne({ walletAddress });
    if (existingwalletAddress) {
      const existingSign = existingwalletAddress.sign.find(sign => sign.proposalId == proposalId);
      console.log("1", existingSign);

      if (existingSign) {
        existingSign.voteFor = voteFor;
        existingSign.v = v;
        existingSign.r = r;
        existingSign.s = s;
      } else {
        existingwalletAddress.sign.push({
          proposalId: proposalId,
          voteFor: voteFor,
          v: v,
          r: r,
          s: s,
        });
      }
      const updatewalletAddress = await existingwalletAddress.save();
      console.log("API resut for update", updatewalletAddress);
      return {
        code: 200,
        message: 'Success - Saved sign data to existing record',
        data: updatewalletAddress,
      };
    } else {
      const obj = {
        walletAddress,
        sign: {
          proposalId: proposalId,
          voteFor: voteFor,
          v: v,
          r: r,
          s: s,
        }
      };

      const result = await CastVoteSignature.create(obj);

      console.log("API result for new", result);
      return {
        code: 200,
        message: 'Success - Saved referral data as a new record',
        data: result,
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return {
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      };
    } else if (error.name === "MongoError" && error.code === 11000) {
      return {
        code: 409,
        message: "Conflict - Duplicate wallet address",
        error: error.message,
      };
    } else {
      return {
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      };
    }
  }
};
const DeleteCastVoteBySig = async (req, res) => {
  try {
    const { proposalAddress } = req.body;

    const deletedRecord = await CastVoteSignature.findOneAndDelete({ proposalAddress });

    if (deletedRecord) {
      console.log("Deleted record:", deletedRecord);
      return {
        code: 200,
        message: 'Success - Deleted record',
        data: deletedRecord,
      };
    } else {
      return {
        code: 404,
        message: 'Not Found - Record not found for deletion',
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return {
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      };
    } else {
      return {
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      };
    }
  }
};
const CastVoteJudgementBySig = async (req, res) => {
  try {
    const { walletAddress, judgementId, favourJudgment, v, r, s } = req.body;
    console.log(req.body);
    const existingwalletAddress = await CastVoteJudgement.findOne({ walletAddress });

    if (existingwalletAddress) {
      const existingSign = existingwalletAddress.sign.find(sign => sign.judgementId == judgementId);
      console.log("1", existingSign);
      if (existingSign) {

        existingSign.favourJudgment = favourJudgment;
        existingSign.v = v;
        existingSign.r = r;
        existingSign.s = s;

      } else {
        existingwalletAddress.sign.push({
          judgementId: judgementId,
          favourJudgment: favourJudgment,
          v: v,
          r: r,
          s: s,
        });
      }

      const updatewalletAddress = await existingwalletAddress.save();
      console.log("API resut for update", updatewalletAddress);
      return {
        code: 200,
        message: 'Success - Saved sign data to existing record',
        data: updatewalletAddress,
      };
    } else {
      const obj = {
        walletAddress,
        sign: {
          judgementId: judgementId,
          favourJudgment: favourJudgment,
          v: v,
          r: r,
          s: s,
        }
      };

      const result = await CastVoteJudgement.create(obj);

      console.log("API result for new", result);
      return {
        code: 200,
        message: 'Success - Saved referral data as a new record',
        data: result,
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return {
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      };
    } else if (error.name === "MongoError" && error.code === 11000) {
      return {
        code: 409,
        message: "Conflict - Duplicate wallet address",
        error: error.message,
      };
    } else {
      return {
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      };
    }
  }
};
const DeleteCastVoteJudgement = async (req, res) => {
  try {
    const { judgementAddress } = req.body;

    const deletedRecord = await CastVoteJudgement.findOneAndDelete({ judgementAddress });

    if (deletedRecord) {
      console.log("Deleted record:", deletedRecord);
      return {
        code: 200,
        message: 'Success - Deleted record',
        data: deletedRecord,
      };
    } else {
      return {
        code: 404,
        message: 'Not Found - Record not found for deletion',
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return {
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      };
    } else {
      return {
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      };
    }
  }
};
module.exports = {
  DelegateBySig,
  DeleteDelegateBySig,
  CastVoteBySig,
  DeleteCastVoteBySig,
  CastVoteJudgementBySig,
  DeleteCastVoteJudgement
};

