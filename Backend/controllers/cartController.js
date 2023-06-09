const supabase = require("../supabase/Supabase_Connect");

const cartController = {
    addToCart: async (req, res) => {
        const { userId, productId } = req.body;
    
        try {
          const { data: user, error } = await supabase
            .from("users")
            .select()
            .eq("id", userId)
            .single();
    
          if (error || !user) {
            return res.status(404).json({ error: "User not found" });
          }
    
          const cart = user.cart || []; // Initialize cart as an array if it's undefined or null
    
          const updatedCart = [...cart, productId];
    
          const { data: updatedUser, error: updateError } = await supabase
            .from("users")
            .update({ cart: updatedCart })
            .eq("id", userId)
            .single();
    
          if (updateError || !updatedUser) {
            console.error("Failed to update user's cart:", updateError);
            return res.status(500).json({ error: "Failed to update user's cart" });
          }
    
          return res.json(updatedUser);
        } catch (error) {
          console.error("Error adding to cart:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      },
  removeFromCart: async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("cart")
        .eq("id", userId)
        .single();

      if (error || !user) {
        return res.status(404).json({ error: "User not found" });
      }

      const cart = user.cart || [];

      const updatedCart = cart.filter((item) => item !== productId);

      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update({ cart: updatedCart })
        .eq("id", userId)
        .single();

      if (updateError || !updatedUser) {
        console.error("Failed to update user's cart:", updateError);
        return res.status(500).json({ error: "Failed to update user's cart" });
      }

      return res.json(updatedUser);
    } catch (error) {
      console.error("Error removing from cart:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllCarts: async (req, res) => {
    const { userId } = req.params;

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select()
        .eq("id", userId)
        .single();

      if (error || !user) {
        return res.status(404).json({ error: "User not found" });
      }

      const cart = user.cart || [];

      return res.json(cart);
    } catch (error) {
      console.error("Error retrieving user's cart:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = cartController;
