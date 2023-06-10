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
  getCartProducts: async (req, res) => {
    const { userId } = req.params; // Retrieve the userId from request parameters
  
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('cart')
        .eq('id', userId)
        .single();
  
      if (error || !user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const cart = user.cart || []; // Get the cart array from the user data
      const { data: products, error: productError } = await supabase
        .from('Shop')
        .select()
        .in('id', cart);
  
      if (productError || !products) {
        console.error('Failed to fetch cart products:', productError);
        return res.status(500).json({ error: 'Failed to fetch cart products' });
      }
  
      return res.json(products);
    } catch (error) {
      console.error('Error retrieving cart products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
,  
getAllProducts: async (req, res) => {
    try {
      const { data: products, error } = await supabase
        .from("Shop")
        .select();

      if (error || !products) {
        console.error("Failed to fetch products:", error);
        return res.status(500).json({ error: "Failed to fetch products" });
      }

      return res.json(products);
    } catch (error) {
      console.error("Error retrieving products:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = cartController;
