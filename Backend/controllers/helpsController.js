const supabase = require("../supabase/Supabase_Connect");



// Controller function for getting FAQs
async function getFAQs(req, res) {
  try {
    // Fetch all FAQs from the 'FAQ' table
    const { data: faqs, error } = await supabase.from('FAQ').select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function for getting guides
async function getGuides(req, res) {
  try {
    // Fetch all guides from the 'Guide' table
    const { data: guides, error } = await supabase.from('Guide').select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFAQs,
  getGuides,
};
