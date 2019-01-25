function extract(rawVal) {
      /*Mongoos count isn't compatible with "ObjectId("nums")" | extracts id value*/
      let oid = rawVal
      /*outter parantheses are string borders(not included), inner parantheses group what's inside, center squares w/ arrow = match chars that aren't ')'  */
      /*Using regEx params to target idValue; 'exec' selects target strand in string, returns array */
      let noid = /\(([^)]+)\)/.exec(oid)
      let newId = noid[1]
      return newId
}






module.exports = { extract }