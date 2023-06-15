const supabase = require("../supabase/Supabase_Connect")

module.exports = {
  
  // backend function to get all conversations of a certain user
  getContacts: async (req,res) => {

    const { id } = req.params
    
    const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .contains('users', [id])

    if(error){
      return res.send(error)
    }

    // formatting the response to return only the conversation id and the id of the other user
    const conversations = data.map(conversation => {
      const userId = conversation.users.filter(user => user !== id)[0]
      return {id: conversation.id, user: userId}
    })

    res.send(conversations)
  },

  getOneContact: async (req,res) => {
    
    const { id } = req.params
  }
}