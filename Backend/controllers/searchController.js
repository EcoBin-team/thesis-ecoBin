require("dotenv").config();
const supabase = require("../supabase/Supabase_Connect");

async function Search(searchTerm) {
  try {
    // Query States
    const { data: states, error: stateError } = await supabase.from('State').select('Name');
    if (stateError) {
      console.error('Error retrieving states:', stateError.message);
      throw stateError;
    }

    // Query Depots
    let { data: depots, error: depotError } = await supabase.from('Depot').select('*');
    if (depotError) {
      console.error('Error retrieving depots:', depotError.message);
      throw depotError;
    }

    // Query Items
    let { data: items, error: itemError } = await supabase.from('items').select('*');
    if (itemError) {
      console.error('Error retrieving items:', itemError.message);
      throw itemError;
    }

    // Filter depots by search term if provided
    if (searchTerm) {
      depots = depots.filter((depot) => depot.Name.toLowerCase().includes(searchTerm.toLowerCase()));
      items = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return { states, depots, items }; // Return as an object
  } catch (error) {
    console.error('Error searching states, depots, and items:', error.message);
    throw error;
  }
}

module.exports = Search;
