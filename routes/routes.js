const router = require('express').Router();
const delegateBySig = require('../controllers/DelegateBySig')
router.route('/delegatesign').post([], async (req, res) => {
    let result = await delegateBySig.DelegateBySig(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/deletesign').delete([], async (req, res) => {
    let result = await delegateBySig.DeleteDelegateBySig(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/castbyvote').post([], async (req, res) => {
    let result = await delegateBySig.CastVoteBySig(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/deletecastbyvote').delete([], async (req, res) => {
    let result = await delegateBySig.DeleteCastVoteBySig(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/castbyjudgement').post([], async (req, res) => {
    let result = await delegateBySig.CastVoteJudgementBySig(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
router.route('/deletecastbyjudgement').delete([], async (req, res) => {
    let result = await delegateBySig.DeleteCastVoteJudgement(req, res);
    res.send(JSON.parse(JSON.stringify(result)))
})
module.exports = router
