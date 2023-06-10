require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")


const depotController = {

  getAllDepots: async (req ,res) => {
    try {  const { data: depots, error } = await supabase.from('depot').select('*');
     if (error) {  throw new Error(error.message);}
        res.status(200).json(depots || [])} 
        catch (error) { res.status(500).json({ error: error.message }); }} ,



   getDepotById: async (req,res) => {const { id } = req.params;
    try {const feed = await supabase.from('depot').select('*') .eq('id', id).single();
      if (feed.error) {
        throw new Error(feed.error.message); }
      res.status(200).json([feed]) }
       catch (error) {res.status(500).json({ error: error.message }); }} ,



       
  SearchDepot :  async  (stateName)=> {
        try { const { data: stateRecords, error: stateError } = await supabase
         .from("State").select("id").ilike("Name", `%${stateName}%`).limit(1);
       if (stateError) {
        throw stateError;}
          if (stateRecords.length === 0) {
            throw new Error(`State "${stateName}" not found.`);}
      
          const stateId = stateRecords[0].id;
          const { data: depotRecords, error: depotError } = await supabase
            .from("depot").select("*").eq("state", stateId);
          if (depotError) {
            throw depotError; }
          return depotRecords;
        } catch (error) { console.error("Error retrieving depots:", error.message);
          return []; }
      }
    }

    
module.exports = depotController
