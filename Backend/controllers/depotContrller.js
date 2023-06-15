require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")


const depotController = {
  getAllDepots: async (req ,res) => {
    try {
        const { data: depots, error } = await supabase.from('depot').select('*');
    
        if (error) {
          throw new Error(error.message);
        }
    
        res.status(200).json(depots || [])
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  } ,

  getDepotById: async (req,res) => {
    const { id } = req.params;

    try {
      const feed = await supabase
        .from('depot')
        .select('*')
        .eq('id', id)
        .single();
  
      if (feed.error) {
        throw new Error(feed.error.message);
      }
  
      res.status(200).json([feed]); // Wrap the feed object in an array
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchDepot: async (req,res) => {

    const { query } = req.query

    const { data, error } = await supabase
    .from("depot")
    .select()
    .textSearch("name", query)

    if(error){
      console.log(error)
    }

    res.send(data)

  }
}
  

module.exports = depotController