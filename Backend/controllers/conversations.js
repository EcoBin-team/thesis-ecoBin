const supabase = require("../supabase/Supabase_Connect")

module.exports = {

  getMessages: async (req,res) => {
    
    const { id } = req.params

    const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("conversation", id)

    if(error){
      return res.send(error)
    }

    res.send(data)
  },

  sendMessage: async (req,res) => {

    const { sender, conversation, message } = req.body

    const { data, error } = await supabase
    .from("chats")
    .insert([{
      sender: sender,
      conversation: conversation,
      message: message
    }])

    if(error){
      return res.send(error)
    }

    res.send(data)
  },
  
  create: async (req,res) => {
    const { users } = req.body

    const usersArray = JSON.parse(users)
    console.log(usersArray)

    const { data, error } = await supabase
    .from("conversations")
    .insert([{
      users: usersArray
    }])

    if(error){
      return res.send(error)
    }

    res.send(data)
  }
}