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
  }
}